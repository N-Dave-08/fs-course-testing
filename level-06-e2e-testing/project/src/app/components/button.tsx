"use client";

import { useState } from "react";

export default function SuccessButton() {
  const [success, setSuccess] = useState(false);

  function onClick() {
    setSuccess(true);
    console.log(success);
  }
  return (
    <div>
      <button type="button" onClick={() => onClick()}>
        click
      </button>
      {success && <div>success</div>}
    </div>
  );
}
