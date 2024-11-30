import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [adjustment,setAdjustment ] = useState("");

  // handling weight value
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  // handling height value
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  // handling submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100; // Assuming height is entered in cm

    if (weightInKg > 0 && heightInMeters > 0) {
      const calculatedBmi = (weightInKg / heightInMeters ** 2).toFixed(2);
      setBmi(calculatedBmi);
      setBmiCategory(getBmiCategory(calculatedBmi));
      console.log(bmi)
    } else {
      alert("Please enter valid positive numbers for weight and height.");
    }
    setAdjustment(calculateWeightAdjustment(weight,height))
  };

  // getting category
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    return "Obesity";
  };

  // getting advice
  function calculateWeightAdjustment(weight, height) {
    const heightInMeters = height / 100; // Assuming height is given in cm
  
    const minNormalWeight = 18.5 * (heightInMeters ** 2);
    const maxNormalWeight = 24.9 * (heightInMeters ** 2);
  
    if (weight < minNormalWeight) {
      const weightToGain = (minNormalWeight - weight).toFixed(2);
      return `You need to gain ${weightToGain} kg to reach a normal BMI.`;
    } else if (weight > maxNormalWeight) {
      const weightToLose = (weight - maxNormalWeight).toFixed(2);
      return `You need to lose ${weightToLose} kg to reach a normal BMI.`;
    } else {
      return `Your weight is already in the normal BMI range.`;
    }
  }
  return (
    <>
      <div className="container">
        <div className="calculator">
          <h1 className="head">BMI CALCULATOR</h1>
          <div className="portions">
            <div className="left-portion">
              <img className="desc-img" src="public/bmidesc.png" alt="" />
            </div>
            <div className="right-portion">
              <form onSubmit={handleSubmit} action="">
                <label htmlFor="height-inp">Enter Your Height(cm)</label>
                <input
                  value={height}
                  onChange={handleHeightChange}
                  className="height-inp"
                  type="text"
                />
                <label htmlFor="weight-inp">Enter Your Weight(Kgs)</label>
                <input
                  value={weight}
                  onChange={handleWeightChange}
                  className="weight-inp"
                  type="text"
                />
                <button
                  className="submit-btn"
                  type="submit"
                >
                  Calculate
                </button>
                {!bmi && (
                  <>
                  <img className="no-data-img" src="public\empty.jpg" alt="" />
                  </>
                )}
                {bmi && (
                  <>
                  <div className="res-desc">
                    <h2 className="desc">Your BMI: {bmi}</h2>
                    <h3 className="desc">Category: {bmiCategory}</h3>
                  </div>
                  </>
                )}
                {adjustment && (
                  <>
                    <h2 className="adjust-desc">{adjustment}</h2>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
