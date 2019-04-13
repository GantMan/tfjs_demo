import React, { Component } from 'react'
import gant from './corn.png'
import './App.css'
import { RPSDataset } from './tfjs/data.js'
import { getAdvancedModel, getSimpleModel } from './tfjs/models.js'
import { train } from './tfjs/train.js'
import {
  showAccuracy,
  showConfusion,
  showExamples
} from './tfjs/evaluationHelpers.js'
import * as tfvis from '@tensorflow/tfjs-vis'

class App extends Component {
  state = {
    currentModel: null
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Rock Paper Scissors</h2>
          <h3>Machine Learning in the browser with TFJS</h3>
          <img src="./rps_circle.png" className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://infinite.red"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinite Red
          </a>
          <a
            className="App-link"
            href="http://gantlaborde.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gant Laborde
          </a>
        </header>
        <div class="Main">
          <p>
            We'll be working with a fun dataset for the classic game, "Rock
            Paper Scissors", provided here:{' '}
            <a
              href="http://www.laurencemoroney.com/rock-paper-scissors-dataset/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rock Paper Scissors Dataset
            </a>
          </p>
          <img src="./rps.jpg" alt="Rock Paper Scissors dataset" />
          <p>
            We'll show progress in the TensorflowJS Vis panel. You'll see it
            when you click the load and show button below.
          </p>
          <button
            class="myButton"
            onClick={async () => {
              const data = new RPSDataset()
              this.data = data
              await data.load()
              await showExamples(data)
            }}
          >
            Load and Show Examples
          </button>
          <p>
            Each of the examples have been loaded now. Due to this being a
            browser, the data is loaded with one{' '}
            <a href="./data.png" target="_blank" rel="noopener noreferrer">
              sprite-sheet
            </a>{' '}
            to get around sandboxing.
          </p>
          <div class="GroupUp">
            <button
              class="myButton"
              onClick={async () => {
                this.setState({ currentModel: 'Simple' })
                const model = getSimpleModel()
                tfvis.show.modelSummary(
                  { name: 'Simple Model Architecture' },
                  model
                )
                this.model = model
              }}
            >
              Create Simple Model
            </button>
            <button
              class="myButton"
              onClick={async () => {
                this.setState({ currentModel: 'Advanced' })
                const model = getAdvancedModel()
                tfvis.show.modelSummary(
                  { name: 'Advanced Model Architecture' },
                  model
                )
                this.model = model
              }}
            >
              Create Advanced Model
            </button>
          </div>
          <p>
            Creating a model, is the structure and blueprint. It starts off able
            to, but terrible at predicting.
          </p>
          <button
            class="myButton"
            onClick={async () => {
              await showAccuracy(this.model, this.data)
              await showConfusion(this.model, this.data, 'Untrained Matrix')
            }}
          >
            Check Untrained Model Results
          </button>
          <p>
            Train your Model with your training data. In this case 2100 labeled
            images, over and over... but not <em>toooooo much.</em>
          </p>
          <button
            class="myButton"
            onClick={async () => {
              const numEpochs = this.state.currentModel === 'Simple' ? 12 : 20
              await train(this.model, this.data, numEpochs)
            }}
          >
            Train Your {this.state.currentModel} Model
          </button>
          <p>
            Now that our model has seen some stuff{' '}
            <span role="img" aria-label="woah">
              😳
            </span>
            <hr />
            It should be smarter at identifying RPS! We can now test it with 420
            RPS images it's never seen before.
          </p>
          <button
            class="myButton"
            onClick={async () => {
              await showAccuracy(this.model, this.data, 'Trained Accuracy')
              await showConfusion(
                this.model,
                this.data,
                'Trained Confusion Matrix'
              )
            }}
          >
            Check Model After Training
          </button>
          <p>
            We can now save our trained model! We can store it via downloading
            it, uploading it, or place the results in localstorage for access of
            the browser.
          </p>
          <p>
            The simple model size comes out to about 48Kb, but some models can
            be as large as 20+MBs! It depends how simple you keep the model. If
            you want the model trained above, you get two files by{' '}
            <a
              class="pointy"
              onClick={async () =>
                await this.model.save('downloads://rps-model')
              }
            >
              clicking here
            </a>
            . The <span class="cod">model.json</span> file demonstrates the
            structure of the model, and the weights are our non-random trained
            values that make the model accurate.
          </p>
        </div>
        <div class="GroupUp">
          <img src={gant} class="wiggle me" alt="Gant Laborde" />
          <ul id="footer">
            <li>
              Website:{' '}
              <a
                href="http://gantlaborde.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GantLaborde.com
              </a>
            </li>
            <li>
              Twitter:{' '}
              <a
                href="https://twitter.com/gantlaborde"
                target="_blank"
                rel="noopener noreferrer"
              >
                @GantLaborde
              </a>
            </li>
            <li>
              Medium:{' '}
              <a
                href="https://medium.freecodecamp.org/@gantlaborde"
                target="_blank"
                rel="noopener noreferrer"
              >
                GantLaborde
              </a>
            </li>
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/GantMan"
                target="_blank"
                rel="noopener noreferrer"
              >
                GantMan
              </a>
            </li>
            <li>
              <a
                href="https://infinite.red"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="./ir.svg" id="InfiniteRed" alt="Infinite Red" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default App
