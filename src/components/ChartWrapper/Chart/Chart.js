import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  CandlestickSeries,
  LineSeries,
  MACDSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";

import SIMULATION from "consts/simulation";

import {
  Annotate,
  SvgPathAnnotation,
  buyPath,
  sellPath
} from "react-stockcharts/lib/annotation";

import {
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { MACDTooltip } from "react-stockcharts/lib/tooltip";

import { timeFormat } from "d3-time-format";
import { discontinuousTimeScaleProviderBuilder } from "react-stockcharts/lib/scale";

const mouseEdgeAppearance = {
  textFill: "#542605",
  stroke: "#05233B",
  strokeOpacity: 1,
  strokeWidth: 3,
  arrowWidth: 5,
  fill: "#BCDEFA"
};

const macdAppearance = {
  stroke: {
    macd: "#FF0000",
    signal: "#00F300"
  },
  fill: {
    divergence: "#4682B4"
  }
};

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
    const {
      type,
      width,
      ratio,
      loadMoreCandles,
      indicators: { macdCalculator, ema12, ema26 }
    } = this.props;
    const { indexStart } = this.state;

    const { data: initialData } = this.props;

    const indexCalculator = discontinuousTimeScaleProviderBuilder()
      .initialIndex(Math.ceil(indexStart))
      .indexCalculator();

    const dataWithIndicators = ema26(ema12(macdCalculator(initialData)));

    const { index } = indexCalculator(dataWithIndicators);

    const xScaleProvider = discontinuousTimeScaleProviderBuilder()
      .initialIndex(Math.ceil(indexStart))
      .withIndex(index);

    const {
      data: linearData,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(dataWithIndicators);

    // For annotations:
    const defaultAnnotationProps = {
      onClick: console.log.bind(console)
    };

    const longAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.low),
      fill: "#006517",
      path: buyPath,
      tooltip: "Bought"
    };

    const shortAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.high),
      fill: "#FF0000",
      path: sellPath,
      tooltip: "Sold"
    };

    return (
      <ChartCanvas
        height={600}
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
        <Chart
          id={1}
          yExtents={d => [d.high, d.low, ema12.accessor(), ema26.accessor()]}
          height={350}
        >
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <CandlestickSeries />

          <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />
          <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()} />

          {/* Buy, Sell annotations: */}
          <Annotate
            with={SvgPathAnnotation}
            when={d => d.action === SIMULATION.ACTION.BUY}
            usingProps={longAnnotationProps}
          />
          <Annotate
            with={SvgPathAnnotation}
            when={d => d.action === SIMULATION.ACTION.SELL}
            usingProps={shortAnnotationProps}
          />

          {/* displaying X and Y coordinates on mouse move: */}
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %H:%M")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />
        </Chart>
        <Chart
          id={2}
          height={150}
          yExtents={macdCalculator.accessor()}
          origin={(w, h) => [0, h - 150]}
          padding={{ top: 10, bottom: 10 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={2} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
            rectRadius={5}
            {...mouseEdgeAppearance}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
            {...mouseEdgeAppearance}
          />

          <MACDSeries yAccessor={d => d.macd} {...macdAppearance} />
          <MACDTooltip
            origin={[-38, 15]}
            yAccessor={d => d.macd}
            options={macdCalculator.options()}
            appearance={macdAppearance}
          />
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
