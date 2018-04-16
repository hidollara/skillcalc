import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSkillFixed: false,
      diff: 5.00,
      rate: 80.00,
    }
  }

  handleChangeDiff(v) {
    if (!this.state.isSkillFixed) {
      this.setState({ diff: v });
      return;
    }
    var calcRate = (this.calcSkill() * 5.0) / v;
    if (calcRate < 0.01 || 100.00 < calcRate) return;
    this.setState({ diff: v, rate: calcRate });
  }

  handleChangeRate(v) {
    if (!this.state.isSkillFixed) {
      this.setState({ rate: v });
      return;
    }
    var calcDiff = (this.calcSkill() * 5.0) / v;
    if (calcDiff < 1.00 || 9.99 < calcDiff) return;
    this.setState({ diff: calcDiff, rate: v });
  }

  calcSkill() {
    return (this.state.diff / 5.0) * this.state.rate;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <Checkbox
              checked={this.state.isSkillFixed}
              onChange={e => this.setState({ isSkillFixed: e.target.checked })}
            >
              {this.calcSkill().toFixed(2)}
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={1} mdOffset={3}>
            {this.state.diff.toFixed(2)}
          </Col>
          <Col xs={12} md={5}>
            <Slider
              value={this.state.diff}
              min={1.00}
              max={9.99}
              step={0.05}
              onChange={this.handleChangeDiff.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={1} mdOffset={3}>
            {this.state.rate.toFixed(2)}
          </Col>
          <Col xs={12} md={5}>
            <Slider
              value={this.state.rate}
              min={0.01}
              max={100.00}
              step={0.01}
              onChange={this.handleChangeRate.bind(this)}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
