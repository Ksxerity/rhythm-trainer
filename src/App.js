import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';

const MAX_NUMBER_OF_KEYS = 13;
const MIN_NUMBER_OF_KEYS = 6;

const Practice = () => {
  const [keySet, setKeySet] = useState([]); // Random numbers indicating arrow orientation
  const [chanceSet, setChanceSet] = useState([]); // Random booleans indiciating chance keys
  const [refs, setRefs] = useState([]); // Refs for each arrow
  const [ptr, setPtr] = useState(0); // Pointer for sequence progress
  const [settings, setSettings] = useState({
    keyQuantity: MIN_NUMBER_OF_KEYS,
    reverseKeyEnabled: false,
    reverseKeyQuantity: 1,
    eightKeyEnabled: false
  });
  const [newSettings, setNewSettings] = useState({
    keyQuantity: MIN_NUMBER_OF_KEYS,
    reverseKeyEnabled: false,
    reverseKeyQuantity: 1,
    eightKeyEnabled: false
  });

  useEffect(() => {
    if (refs.length === 0) {
      let arr = []
      for (let i = 0; i < MAX_NUMBER_OF_KEYS; i++) {
        arr.push(React.createRef());
      }
      setRefs(arr);
      resetKeys();
    }
    document.addEventListener("keydown", checkKeyPress);
    return () => document.removeEventListener("keydown", checkKeyPress);
  }, [refs, ptr]);

  useEffect(() => {
    resetKeys();
  }, [settings]);

  const checkKeyPress = (e) => {
    if (e.code === refs[ptr].current.getAttribute('keybind') || e.code === refs[ptr].current.getAttribute('orientation')) {
      setPtr(ptr + 1);
    } else {
      setPtr(0);
    }
  }

  const generateRandomNumbers = () => {
    let set = [];
    for (let i = 0; i < MAX_NUMBER_OF_KEYS; i++) {
      if (settings.eightKeyEnabled) {
        set.push(Math.floor(Math.random() * 8))
      } else {
        set.push(Math.floor(Math.random() * 4))
      }
    }
    setKeySet(set);
  }

  const generateChanceNumbers = () => {
    let arrNum = [];
    let arrBool = [];
    for (let i = 0; i < settings.keyQuantity; i++) {
      arrNum.push(i);
      arrBool.push(false);
    }

    let x = settings.keyQuantity;
    let y = 0;
    let temp;
    while (x--) {
      y = Math.floor(Math.random() * x);
      temp = arrNum[x];
      arrNum[x] = arrNum[y];
      arrNum[y] = temp;
    }

    for (let i = 0; i < settings.reverseKeyQuantity; i++) {
      arrBool[arrNum[i]] = true;
    }
    setChanceSet(arrBool);
  }

  const resetKeys = () => {
    generateRandomNumbers()
    if (settings.reverseKeyEnabled) {
      generateChanceNumbers()
    }
    setPtr(0);
  }

  const generateKeys = () => {
    let arr = Array.from(Array(settings.keyQuantity).keys());
    if (ptr === settings.keyQuantity) {
      resetKeys();
    }
    return arr.map(i => {
      let key = keySet[i];
      switch (key) {
        case 0:
          // Up arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} orientation="ArrowUp" keybind="Numpad8" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={[styles.arrow, styles.down].join(' ')}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} orientation="ArrowUp" keybind="Numpad8" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={[styles.arrow, styles.up].join(' ')}></div>
            </div>)
          }
        case 1:
          // Down arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} orientation="ArrowDown" keybind="Numpad2" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={[styles.arrow, styles.up].join(' ')}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} orientation="ArrowDown" keybind="Numpad2" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={[styles.arrow, styles.down].join(' ')}></div>
            </div>)
          }
        case 2:
          // Left arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} orientation="ArrowLeft" keybind="Numpad4" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={[styles.arrow, styles.right].join(' ')}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} orientation="ArrowLeft" keybind="Numpad4" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={styles.arrow}></div>
            </div>)
          }
        case 3:
          // Right arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} orientation="ArrowRight" keybind="Numpad6" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={styles.arrow}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} orientation="ArrowRight" keybind="Numpad6" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={[styles.arrow, styles.right].join(' ')}></div>
            </div>)
          }
        case 4:
          // Top-left arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} keybind="Numpad7" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={[styles.arrow, styles["bottom-right"]].join(' ')}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} keybind="Numpad7" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={[styles.arrow, styles["top-left"]].join(' ')}></div>
            </div>)
          }
        case 5:
          // Top-right arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} keybind="Numpad9" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={[styles.arrow, styles["bottom-left"]].join(' ')}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} keybind="Numpad9" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={[styles.arrow, styles["top-right"]].join(' ')}></div>
            </div>)
          }
        case 6:
          // Bottom-left arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} keybind="Numpad1" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={[styles.arrow, styles["top-right"]].join(' ')}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} keybind="Numpad1" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={[styles.arrow, styles["bottom-left"]].join(' ')}></div>
            </div>)
          }
        default:
          // Bottom-right arrow
          if (chanceSet[i]) {
            // Reverse the originally key orientation
            return (<div key={i} ref={refs[i]} keybind="Numpad3" className={[styles.circle, ptr > i ? styles.green : styles.red].join(' ')}>
              <div className={[styles.arrow, styles["top-left"]].join(' ')}></div>
            </div>)
          } else {
            return (<div key={i} ref={refs[i]} keybind="Numpad3" className={[styles.circle, ptr > i ? styles.green : styles.blue].join(' ')}>
              <div className={[styles.arrow, styles["bottom-right"]].join(' ')}></div>
            </div>)
          }
      }
    })
  }

  const handleCheckboxChange = (e) => {
    setNewSettings(state => ({ ...state, [e.target.name]: e.target.checked }))
  }

  const handleQuantityChange = (e) => {
    setNewSettings(state => ({ ...state, [e.target.name]: parseInt(e.target.value) }));
  }

  const handleSubmit = () => {
    setSettings(newSettings);
  }

  // INCLUDE MESSAGE THAT FOCUS IS NOT ON THE PLAYING FIELD BUT IS INSTEAD ON THE SETTINGS
  // Settings => color, timer? (show times in a list on the right or something?), press ctrl to finish
  // Modal for instructions?
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>Rhythm Trainer</h1>
        This app was made to practice inputting random arrow sequences faster. Although it&apos;s called Rhythm trainer, it isn&apos;t made to train your rhythm but instead train
        the speed at which you can enter arrow inputs. The idea for this app was based off of a game called Audition Online which required the user to quickly input a sequence of
        arrows and then hit the ctrl key in line with the rhythm of the music.
      </div>
      <div className={styles.settings}>
        <div className={styles["first-column"]}>
          <div className={styles.quantity}>
            <label htmlFor="quantity">Number of Keys</label>
            <input id="quantity" type="number" className={"form-control"} name="keyQuantity" min={MIN_NUMBER_OF_KEYS} max={MAX_NUMBER_OF_KEYS} value={newSettings.keyQuantity} onChange={handleQuantityChange}></input>
          </div>
          <div className={["custom-control custom-switch", styles.reverse].join(' ')}>
            <input type="checkbox" id="reverseSwitch" className="custom-control-input" name="reverseKeyEnabled" onClick={handleCheckboxChange}></input>
            <label htmlFor="reverseSwitch" className="custom-control-label">Reverse Keys</label>
            <input type="number" className={"form-control"} name="reverseKeyQuantity" min="1" max="6" value={newSettings.reverseKeyQuantity} onChange={handleQuantityChange} disabled={!newSettings.reverseKeyEnabled}></input>
          </div>
          <div className={["custom-control custom-switch", styles["eight-key"]].join(' ')}>
            <input type="checkbox" id="eightSwitch" className="custom-control-input" name="eightKeyEnabled" onClick={handleCheckboxChange}></input>
            <label htmlFor="eightSwitch" className="custom-control-label">Eight Keys</label>
          </div>
        </div>
        <div className={styles.divider}></div>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
      <div className={styles.bar}>
        {generateKeys()}
      </div>
    </div>
  )
}

export default Practice;
