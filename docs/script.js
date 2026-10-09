"use strict";

const shotCount = document.querySelector("#shot-count");
const evStep = document.querySelector("#ev-step");
const shotOrder = document.querySelector("#shot-order");
const exposures = document.querySelector("#exposures");
const sequenceOutput = document.querySelector("#sequence-output");

function formatEV(value) {
  if (Math.abs(value) < 0.001) return "0";
  const magnitude = Number(Math.abs(value).toFixed(2));
  return `${value < 0 ? "−" : "+"}${magnitude}`;
}

function updateSequence() {
  const count = Number(shotCount.value);
  const step = Number(evStep.value);
  const half = (count - 1) / 2;
  let offsets = [];
  if (shotOrder.value === "ascending" || shotOrder.value === "descending") {
    for (let i = -half; i <= half; i++) offsets.push(i * step);
    if (shotOrder.value === "descending") offsets.reverse();
  } else {
    offsets.push(0);
    const direction = shotOrder.value === "bright" ? 1 : -1;
    for (let i = 1; i <= half; i++) {
      offsets.push(i * step * direction, -i * step * direction);
    }
  }
  exposures.replaceChildren();
  exposures.style.gridTemplateColumns = `repeat(${count > 5 ? Math.ceil(count / 2) : count}, minmax(0, 1fr))`;
  offsets.forEach((ev, index) => {
    const frame = document.createElement("div");
    frame.className = "exposure";
    frame.style.setProperty("--exposure", Math.max(0.2, Math.min(2, 1 + ev * 0.3)));
    const scene = document.createElement("span");
    scene.className = "scene";
    scene.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = `${index + 1} / ${formatEV(ev)} EV`;
    frame.append(scene, label);
    exposures.append(frame);
  });
  sequenceOutput.textContent = `Shot order: ${offsets.map(formatEV).join(" → ")} EV`;
}

[shotCount, evStep, shotOrder].forEach(control => control.addEventListener("change", updateSequence));
updateSequence();

// Keep the code selectable even in browsers without the Clipboard API.
if (navigator.clipboard && window.isSecureContext) {
  document.querySelectorAll("[data-copy]").forEach(button => {
    button.hidden = false;
    button.addEventListener("click", async () => {
      const code = document.getElementById(button.dataset.copy);
      const status = document.getElementById("copy-status");
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = "Copied";
        status.textContent = "Code copied to clipboard.";
        window.setTimeout(() => { button.textContent = "Copy"; }, 2000);
      } catch {
        status.textContent = "Clipboard access was unavailable. Select the code to copy it.";
      }
    });
  });
}
