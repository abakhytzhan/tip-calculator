import { ChangeEvent, useMemo, useState, useRef } from "react";
import styles from "./Calculator.module.css";
import Image from "next/image";
import picture from "../../../public/path.svg";
import picture2 from "../../../public/path-1.svg";

const Calculator = () => {
  const [curr, setCurr] = useState(0);
  const [btn, setBtn] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [text, setText] = useState("");

  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  const ref3 = useRef<HTMLButtonElement>(null);
  const ref4 = useRef<HTMLButtonElement>(null);
  const ref5 = useRef<HTMLButtonElement>(null);
  const refInput1 = useRef<HTMLInputElement>(null);
  const refInput2 = useRef<HTMLInputElement>(null);
  const refInput3 = useRef<HTMLInputElement>(null);

  const currencyHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "00") {
      event.currentTarget.value = "0";
    } else if (
      event.currentTarget.value[0] === "0" &&
      event?.currentTarget?.value[1] !== "." &&
      event.currentTarget.value.length === 2
    ) {
      event.currentTarget.value = event?.currentTarget?.value[1];
    }

    let number = Number(event.currentTarget.value);
    setCurr(() => number);
  };

  const customHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (ref1.current) ref1.current.style.backgroundColor = "#00474b";
    if (ref2.current) ref2.current.style.backgroundColor = "#00474b";
    if (ref3.current) ref3.current.style.backgroundColor = "#00474b";
    if (ref4.current) ref4.current.style.backgroundColor = "#00474b";
    if (ref5.current) ref5.current.style.backgroundColor = "#00474b";

    let number = Number(event.currentTarget.value);
    setBtn(() => number);
  };

  const buttonHandle = (event: any) => {
    if (ref1.current) ref1.current.style.backgroundColor = "#00474b";
    if (ref2.current) ref2.current.style.backgroundColor = "#00474b";
    if (ref3.current) ref3.current.style.backgroundColor = "#00474b";
    if (ref4.current) ref4.current.style.backgroundColor = "#00474b";
    if (ref5.current) ref5.current.style.backgroundColor = "#00474b";
    let number = Number(event.currentTarget.value);
    setBtn(() => number);
    event.currentTarget.style.backgroundColor = "#26c2ae";
    if (refInput2.current) refInput2.current.value = "";
  };

  const peopleHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "00") {
      event.currentTarget.value = "0";
    } else if (
      event.currentTarget.value[0] === "0" &&
      event?.currentTarget?.value[1] !== "." &&
      event.currentTarget.value.length === 2
    ) {
      event.currentTarget.value = event?.currentTarget?.value[1];
    }

    let number = Number(event.currentTarget.value);
    if (number === 0) {
      setText(() => "Cant be zero");
      setNumberOfPeople(() => 0);
    } else {
      setText(() => "");
      setNumberOfPeople(() => number);
    }
  };

  const resetHandle = () => {
    setCurr(() => 0);
    setBtn(() => 0);
    setNumberOfPeople(() => 0);
    if (refInput1.current) refInput1.current.value = "";
    if (refInput2.current) refInput2.current.value = "";
    if (refInput3.current) refInput3.current.value = "";
    if (ref1.current) ref1.current.style.backgroundColor = "#00474b";
    if (ref2.current) ref2.current.style.backgroundColor = "#00474b";
    if (ref3.current) ref3.current.style.backgroundColor = "#00474b";
    if (ref4.current) ref4.current.style.backgroundColor = "#00474b";
    if (ref5.current) ref5.current.style.backgroundColor = "#00474b";
  };

  const total = useMemo(() => {
    if (curr && btn && numberOfPeople) {
      return Number(((curr * (1 + btn / 100)) / numberOfPeople).toFixed(2));
    } else {
      return "0.00";
    }
  }, [curr, btn, numberOfPeople]);

  const tipPerPerson = useMemo(() => {
    if (curr && btn && numberOfPeople) {
      return Number(((curr * (btn / 100)) / numberOfPeople).toFixed(2));
    } else {
      return "0.00";
    }
  }, [curr, btn, numberOfPeople]);

  return (
    <div className={styles.calculator}>
      <div className={styles.left}>
        <div className={styles.bill}>
          <div className={styles.billText}>Bill</div>

          <div className={styles.currencyinput}>
            <span className={styles.currencyIcon}>$</span>

            <input
              type="number"
              onChange={currencyHandle}
              name="currency"
              placeholder="0"
              ref={refInput1}
            />
          </div>
        </div>
        <div className={styles.selectTip}>
          <div className={styles.selectTipText}>Select Tip %</div>
          <div className={styles.selectTipButtons}>
            <button ref={ref1} onClick={buttonHandle} value="5">
              5%
            </button>
            <button ref={ref2} onClick={buttonHandle} value="10">
              10%
            </button>
            <button ref={ref3} onClick={buttonHandle} value="15">
              15%
            </button>
            <button ref={ref4} onClick={buttonHandle} value="25">
              25%
            </button>
            <button ref={ref5} onClick={buttonHandle} value="50">
              50%
            </button>
            <input
              type="number"
              className={styles.custom}
              onChange={customHandle}
              placeholder="Custom   "
              ref={refInput2}
            />
          </div>
        </div>
        <div className={styles.numberOfPeople}>
          <div className={styles.bill}>
            <div className={styles.billHeader}>
              <div className={styles.billText}>Number of people</div>
              <div className={styles.billText2}>{text}</div>
            </div>

            <div className={styles.numberOfPeopleInput}>
              <div className={styles.picture}>
                <Image
                  className={styles.picture1}
                  src={picture}
                  alt="splitter"
                  width={8}
                  height={8}
                ></Image>
                <Image
                  className={styles.picture2}
                  src={picture2}
                  alt="splitter"
                  width={8}
                  height={8}
                ></Image>
              </div>

              <input
                onChange={peopleHandle}
                type="number"
                name="number"
                placeholder="0"
                ref={refInput3}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.tipAmount}>
          <div className={styles.leftTip}>
            <div className={styles.title}>Tip Amount</div>
            <div className={styles.subtitle}>/per person</div>
          </div>
          <div className={styles.tipPerPerson}>$ {tipPerPerson}</div>
        </div>
        <div className={styles.tipAmount}>
          <div className={styles.leftTip}>
            <div className={styles.title}>Total</div>
            <div className={styles.subtitle}>/per person</div>
          </div>
          <div className={styles.tipTotal}>$ {total}</div>
        </div>

        <button className={styles.reset} onClick={resetHandle}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default Calculator;
