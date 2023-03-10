import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import yfinance as yf
from pandas_datareader._utils import RemoteDataError
import matplotlib
import matplotlib.pyplot as plt
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io

# TODO - Make the endpoint run_simulation return a json object with a list of 
# Base 64 strings that unserialize to the plots of stocks.

matplotlib.use('SVG')

app = Flask(__name__)
CORS(app)


def plot_stock(ticker, titles, start_date, end_date, all_returns):
    data = yf.Ticker(ticker)
    prices = data.history(start=start_date, end=end_date).Close
    prices.index = pd.to_datetime(prices.index)

    plt.figure(figsize=(12, 6))
    plt.subplot(2, 1, 1)
    prices.plot()
    plt.title(titles[0], fontsize=16)
    plt.ylabel('Price (SEK)', fontsize=14)

    plt.subplot(2, 1, 2)
    plt.plot(all_returns[0], all_returns[1], color='g')
    plt.title(titles[1], fontsize=16)
    plt.ylabel('Returns %', fontsize=14)
    plt.axhline(0, color='k', linestyle='--')

    plt.tight_layout()

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)

    image_base64 = base64.b64encode(buffer.read()).decode('utf-8')

    return image_base64


def perform_analysis(ticker, start_date, end_date,
                     return_period_weeks, verbose=False):

    try:
        data = yf.Ticker(ticker)
        prices = data.history(start=start_date, end=end_date).Close
    except (RemoteDataError, KeyError):
        return -np.inf, np.inf, None

    prices.index = pd.to_datetime(prices.index)

    return_after_period = []
    buy_dates = []

    for buy_date, buy_price in prices.items():
        sell_date = buy_date + timedelta(weeks=return_period_weeks)

        try:
            sell_price = prices[prices.index == sell_date].iloc[0]

        except IndexError:
            continue
    
        pct_return = (sell_price - buy_price) / buy_price
        return_after_period.append(pct_return)
        buy_dates.append(buy_date)

    if len(return_after_period) == 0:
        return -np.inf, np.inf, None

    return np.mean(return_after_period), np.std(return_after_period), \
        [buy_dates, return_after_period]


@app.route('/get_stocks', methods=['POST'])
def run_simulation():
    data = request.get_json()

    start_string, end_string = data['start'], data['end']
    start = datetime.strptime(start_string, '%Y-%m-%d').date()
    end = datetime.strptime(end_string, '%Y-%m-%d').date()
    return_period_weeks = int(data['return_period_weeks'])
    min_avg_return = float(data['min_avg_return'])
    max_dev_return = float(data['max_dev_return'])

    plot_strings = []

    series_tickers = pickle.load(open("data/swedish_tickers.p", "rb"))
    for ticker, name in series_tickers.items():
        avg_return, std_dev_return, all_returns = \
            perform_analysis(ticker,
                             start,
                             end,
                             return_period_weeks)

        if avg_return > min_avg_return and std_dev_return < max_dev_return:
            title_price = f"{ticker}\n{name}"
            title_return = f"Avg return: {round(100*avg_return, 2)}pct | Dev return: {round(100* std_dev_return, 2)}pct"
            plot_strings.append(plot_stock(ticker,
                                           [title_price, title_return],
                                           start, end, all_returns))

    return jsonify({"plots": plot_strings})


if __name__ == "__main__":
    app.run(debug=True)
