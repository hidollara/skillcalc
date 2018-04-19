import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Status extends React.Component {
  render() {
    return (
      <ControlLabel style={{ display: "block", margin: "0 auto"}}>
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
            min={1.00}
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
      skill: 80,
      diff: 5.00,
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
