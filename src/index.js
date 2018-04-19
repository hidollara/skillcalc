import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GradientSVG from './grad.js';
import './status.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Status extends React.Component {
  rank() {
    return (
      this.props.rate < 63.00 ? "C" :
      this.props.rate < 73.00 ? "B" :
      this.props.rate < 80.00 ? "A" :
      this.props.rate < 95.00 ? "S" :
      "SS"
    );
  }

  render() {
    return (
      <ControlLabel className={"status " + this.rank()}>
        <GradientSVG
          id={"rankC"}
          stops={{
            0: "#2fea59",
            50: "#f9ec92",
            100: "#2db55a",
          }}
        />
        <GradientSVG
          id={"rankB"}
          stops={{
            0: "#fa7f29",
            50: "#fdf127",
            100: "#e7772f",
          }}
        />
        <GradientSVG
          id={"rankA"}
          stops={{
            0: "#c50e18",
            50: "#fdc5c4",
            100: "#c50e18",
          }}
        />
        <GradientSVG
          id={"rankS"}
          stops={{
            0: "#eaac30",
            50: "#fdf692",
            100: "#fed342",
          }}
        />
        <GradientSVG
          id={"rankSS"}
          stops={{
            0: "#eaac30",
            50: "#fdf692",
            100: "#fed342",
          }}
        />
        <CircularProgressbar
          percentage={this.props.rate}
          textForPercentage={pct => pct < 100 ? `${pct}%` : "MAX"}
        />
      </ControlLabel>
    );
  }
}

class SkillSlider extends React.Component {
  render() {
    return (
      <div>
        <p>SKILL: {this.props.skill.toFixed(2)}</p>
        <div>
          <Slider
            value={this.props.skill}
            min={100.00}
            max={199.00}
            step={1.00}
            onChange={this.props.handler}
          />
        </div>
      </div>
    );
  }
}

class DifficultySlider extends React.Component {
  minimumDiff() {
    return (this.props.skill / 100.0) * 5.0;
  }

  render() {
    return (
      <div>
        <p>DIFF: {this.props.diff.toFixed(2)}</p>
        <div>
          <Slider
            value={this.props.diff}
            min={this.minimumDiff()}
            max={9.95}
            step={0.05}
            onChange={this.props.handler}
          />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: 140.00,
      diff: 8.00,
    }
  }

  rate() { return (this.state.skill / (this.state.diff / 5.0)); }

  render() {
    return (
      <Grid fluid={true}>
        <Col xs={12}>
          <Grid>
            <Col xs={12} sm={6}>
              <Status
                rate={this.rate().toFixed(2)}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Row>
                <Col xs={12}>
                  <SkillSlider
                    skill={this.state.skill}
                    handler={v => this.setState({ skill: v })}
                  />
                </Col>
                <Col xs={12}>
                  <DifficultySlider
                    skill={this.state.skill}
                    diff={this.state.diff}
                    handler={v => this.setState({ diff: v })}
                  />
                </Col>
              </Row>
            </Col>
          </Grid>
        </Col>
      </Grid>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
