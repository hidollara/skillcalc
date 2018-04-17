import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import key from './key.png';

const DIFF_MAX = 9.99;
const DIFF_MIN = 1.00;
const RATE_MAX = 100.00;
const RATE_MIN = 0.01;
const RATE_MIN_DISP = 50.0;

class Status extends React.Component {
  render() {
    return (
      <ControlLabel style={{ display: "block", margin: "0 auto"}}>
        <div style={{ position: "relative" }}>
          <input type="checkbox"
            checked={this.props.isSkillFixed}
            onChange={this.props.onChange}
            style={{ display: "none" }}
          />
          <img src={key} alt={"Locked"} />
          <CircularProgressbar
            percentage={100 * this.props.skill / 170.0}
            textForPercentage={_ => this.props.skill.toFixed(2)}
          />
        </div>
      </ControlLabel>
    );
  }
}

class DifficultySlider extends React.Component {
  render() {
    return (
      <div>
        <Col xs={12}>
          {this.props.diff.toFixed(2)}
        </Col>
        <Col xs={12}>
          <Slider
            value={this.props.diff}
            min={DIFF_MIN}
            max={DIFF_MAX}
            step={0.05}
            onChange={this.props.onChange}
          />
        </Col>
      </div>
    );
  }
}

class RateSlider extends React.Component {
  render() {
    return (
      <div>
        <Col xs={12}>
          {this.props.rate.toFixed(2)}
        </Col>
        <Col xs={12}>
          <Slider
            value={this.props.rate}
            min={RATE_MIN_DISP}
            max={RATE_MAX}
            step={0.01}
            marks={{63: "B", 73: "A", 80: "S", 95: "SS"}}
            onChange={this.props.onChange}
          />
        </Col>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: {
        isFixed: false,
      },
      diff: 5.00,
      rate: 80.00,
    }
  }

  handleChangeIsFixed(e) {
    this.setState({ skill: { isFixed: e.target.checked } });
  }

  handleChangeDiff(v) {
    if (!this.state.skill.isFixed) {
      this.setState({ diff: v });
      return;
    }
    var rate = (this.calcSkill() * 5.0) / v;
    if (rate < RATE_MIN || RATE_MAX < rate) return;
    this.setState({ diff: v, rate: rate });
  }

  handleChangeRate(v) {
    if (!this.state.skill.isFixed) {
      this.setState({ rate: v });
      return;
    }
    var diff = (this.calcSkill() * 5.0) / v;
    if (diff < DIFF_MIN || DIFF_MAX < diff) return;
    this.setState({ diff: diff, rate: v });
  }

  calcSkill() {
    return (this.state.diff / 5.0) * this.state.rate;
  }

  render() {
    return (
      <Grid fluid={true}>
        <Col xs={12}>
          <Grid>
            <Col xs={12} sm={6}>
              <Status
                isSkillFixed={this.state.isSkillFixed}
                onChange={this.handleChangeIsFixed.bind(this)}
                skill={this.calcSkill()}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Row>
                <DifficultySlider
                  diff={this.state.diff}
                  onChange={this.handleChangeDiff.bind(this)}
                />
              </Row>
              <Row>
                <RateSlider
                  rate={this.state.rate}
                  onChange={this.handleChangeRate.bind(this)}
                />
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
