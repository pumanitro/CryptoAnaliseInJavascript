import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { discontinuousTimeScaleProviderBuilder } from "react-stockcharts/lib/scale";
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates";

class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      indexStart: 0
    };
  }

  // for debugg purposes:
  keyHandler = event => {
    if (event.keyCode === 39) {
      this.setState({ indexStart: this.state.indexStart + 1 });
    } else if (event.keyCode === 37) {
      this.setState({ indexStart: this.state.indexStart - 1 });
    }
  };

  // for debugg purposes:
  componentDidMount() {
    document.addEventListener("keydown", this.keyHandler, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyHandler, false);
  }

  render() {
    const { type, width, ratio, loadMoreCandles } = this.props;
    const { indexStart } = this.state;

    const { data: initialData } = this.props;

    const indexCalculator = discontinuousTimeScaleProviderBuilder()
      .initialIndex(Math.ceil(indexStart))
      .indexCalculator();

    const { index } = indexCalculator(initialData);

    const xScaleProvider = discontinuousTimeScaleProviderBuilder()
      .initialIndex(Math.ceil(indexStart))
      .withIndex(index);

    const {
      data: linearData,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(initialData);

    return (
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={linearData}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        onLoadMore={(start, end) => {
          loadMoreCandles().then(({ retrievedCandlesLength }) => {
            const missingCandlesAmount = Math.ceil(end - start);
            return this.setState({
              indexStart:
                start - (retrievedCandlesLength - missingCandlesAmount)
            });
          });
        }}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <CandlestickSeries />
        </Chart>
      </ChartCanvas>
    );
  }
}

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChart.defaultProps = {
  type: "svg"
};
CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
