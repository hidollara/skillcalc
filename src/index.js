import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import key from './key.png';

const SKILL_MAX = 199.00;
const SKILL_MIN = 1.00;
const DIFF_MAX = 9.95;
const DIFF_MIN = 1.00;

class Status extends React.Component {
  render() {
    return (
      <ControlLabel style={{ display: "block", margin: "0 auto"}}>
        <CircularProgressbar
          percentage={this.props.rate}
        />
      </ControlLabel>
    );
  }
}

class SkillSlider extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          SKILL: {this.props.skill.toFixed(2)}
        </Col>
        <Col xs={12}>
          <Slider
            value={this.props.skill}
            min={SKILL_MIN}
            max={SKILL_MAX}
            step={1.0}
            onChange={this.props.handler}
          />
        </Col>
      </Row>
    );
  }
}

class DifficultySlider extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          DIFF: {this.props.diff.toFixed(2)}
        </Col>
        <Col xs={12}>
          <Slider
            value={this.props.diff}
            min={DIFF_MIN}
            max={DIFF_MAX}
            step={0.05}
            onChange={this.props.handler}
          />
        </Col>
      </Row>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: 80,
      diff: 5.00,
    }
  }

  handleSkill(v) {
    var diff = Math.max(this.state.diff, (v / 100) * 5.0);
    this.setState({
      skill: v,
      diff: diff,
    });
  }

  handleDiff(v) {
    var skill = Math.min(this.state.skill, (v / 5.0) * 100.0);
    this.setState({
      skill: skill,
      diff: v,
    });
  }

  calcRate() { return this.state.skill / (this.state.diff / 5.0); }

  render() {
    return (
      <Grid fluid={true}>
        <Col xs={12}>
          <Grid>
            <Col xs={12} sm={6}>
              <Status
                rate={this.calcRate().toFixed(2)}
              />
            </Col>
            <Col xs={12} sm={6}>
              <SkillSlider
                skill={this.state.skill}
                handler={this.handleSkill.bind(this)}
              />
              <DifficultySlider
                diff={this.state.diff}
                handler={this.handleDiff.bind(this)}
              />
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
