import React from 'react';

function CardForm(props) {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="front" className="form-label">
            Front Side
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="front"
            name="front"
            placeholder={props.formData.front}
            onChange={props.handleChange}
            value={props.formData.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back" className="form-label">
            Back Side
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="back"
            name="back"
            placeholder={props.formData.back}
            onChange={props.handleChange}
            value={props.formData.back}
          />
        </div>
        <input
          className="btn btn-secondary mr-3"
          type="reset"
          onClick={props.handleReset}
          value="Reset"
        ></input>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CardForm;
