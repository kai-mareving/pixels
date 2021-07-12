import React from 'react';
import styles from './App.scss';
// import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';

const PIXEL_SIZE = 10;

class App extends React.Component {
  state = {
    pixels: [
      { x: 2, y: 8, color: '#e1644e' },
      { x: 8, y: 3, color: 'yellow' },
      { x: 1, y: 8, color: 'blue' }
    ]
  }

  handlePixelsClicked(event) {
    const coordinate = {
      x: Math.floor(event.clientX / PIXEL_SIZE),
      y: Math.floor(event.clientY / (PIXEL_SIZE + 15))
    }
    this.setState({
      selectedCoordinate: coordinate
    })
    //> console.log('handlePixelsClicked:', coordinate)
  }

  handleColorPicked(color) {
    this.setState({
      pixels: this.state.pixels.concat({
        ...this.state.selectedCoordinate,
        color: color.hex
      })
    })

    console.log(this.state.pixels[0].color, color.hex)
  }

  render() {
    //> console.log(this.state);

    return (
      <main className={styles.component}>
        <h1 className={styles.title}>Pixels</h1>
        <h2 className={styles.subtitle}>Fun of pixeling</h2>
        <div id='pixels'
          onClick={this.handlePixelsClicked.bind(this)}
          style={{
            position: 'relative',
            width: '1000px',
            height: '1000px'
          }}>
          {this.state.pixels.map((pixel, index) =>
            <div key={index} style={{
              position: 'absolute',
              left: pixel.x * PIXEL_SIZE,
              top: pixel.y * PIXEL_SIZE,
              width: PIXEL_SIZE,
              height: PIXEL_SIZE,
              backgroundColor: pixel.color
            }}></div>
          )}

          {
            this.state.selectedCoordinate && <div style={{
              position: 'absolute',
              left: this.state.selectedCoordinate.x * PIXEL_SIZE,
              top: this.state.selectedCoordinate.y * PIXEL_SIZE
            }}>

              <CirclePicker onChange={this.handleColorPicked.bind(this)}/>
          </div>
          }

        </div>
      </main>
    )
  }
}

export default App;
