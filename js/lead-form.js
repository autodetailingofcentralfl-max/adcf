(function () {
  var form = document.querySelector("[data-lead-form]");
  if (!form) return;

  var success = document.querySelector("[data-lead-success]");
  var alertBox = form.querySelector("[data-lead-alert]");
  var submitBtn = form.querySelector("[type=submit]");
  var fields = {
    name: form.querySelector("[name=name]"),
    phone: form.querySelector("[name=phone]"),
    vehicle: form.querySelector("[name=vehicle]")
  };

  function clean(value, max) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
  }

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function validate() {
    var name = clean(fields.name.value, 80);
    var phone = clean(fields.phone.value, 32);
    var vehicle = clean(fields.vehicle.value, 120);
    var phoneDigits = digits(phone);
    var errors = {};

    if (name.length < 2) errors.name = "Enter your name.";
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      errors.phone = "Enter a phone number we can text.";
    }
    if (vehicle.length < 2) {
      errors.vehicle = "Enter the year, make, and model, or the body type.";
    }

    return { errors: errors, name: name, phone: phone, vehicle: vehicle };
  }

  function showErrors(errors) {
    ["name", "phone", "vehicle"].forEach(function (key) {
      var input = fields[key];
      var message = form.querySelector('[data-error-for="' + key + '"]');
      var invalid = Boolean(errors[key]);
      input.setAttribute("aria-invalid", invalid ? "true" : "false");
      input.closest(".field").classList.toggle("is-invalid", invalid);
      if (message) message.textContent = errors[key] || "";
    });
  }

  function setAlert(message) {
    if (!alertBox) return;
    alertBox.hidden = !message;
    alertBox.textContent = message || "";
  }

  function configuredKey() {
    var key = String(window.ADCF_LEAD_ACCESS_KEY || "").trim();
    if (!key || key === "YOUR_ACCESS_KEY_HERE" || key === "REPLACE_ME") return "";
    return key;
  }

  function showSuccess() {
    form.hidden = true;
    if (!success) return;
    success.hidden = false;
    var heading = success.querySelector("h2");
    if (heading) heading.focus();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var result = validate();
    showErrors(result.errors);
    setAlert("");

    if (Object.keys(result.errors).length) {
      var firstInvalid = form.querySelector(".is-invalid input");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var honeypot = form.querySelector("[name=botcheck]");
    if (honeypot && honeypot.checked) {
      showSuccess();
      return;
    }

    var key = configuredKey();
    if (!key) {
      setAlert("This form isn’t sending yet. Call 407-561-4200 and tell us the vehicle — we’ll give you a ballpark.");
      return;
    }

    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    var payload = {
      access_key: key,
      subject: "Ad lead: " + result.name + " — " + result.vehicle,
      from_name: form.getAttribute("data-lead-from") || "ADCF Get Quote",
      name: result.name,
      phone: result.phone,
      vehicle: result.vehicle,
      source: form.getAttribute("data-lead-source") || "adcf.us/get-quote (Meta ad)"
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (sent) {
        if (sent.ok && sent.data && sent.data.success) {
          showSuccess();
          return;
        }
        setAlert("That didn’t send. Call 407-561-4200 and we’ll take the details.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      })
      .catch(function () {
        setAlert("That didn’t send. Call 407-561-4200 and we’ll take the details.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
})();
