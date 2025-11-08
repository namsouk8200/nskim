(function () {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const submitBtn = document.getElementById('submitBtn');

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
  };

  function showError(input, msg) {
    const el = document.querySelector(`.error[data-error-for="${input.id}"]`);
    if (el) el.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function clearErrors() {
    Object.values(fields).forEach((f) => showError(f, ''));
  }

  function validate() {
    clearErrors();
    let ok = true;

    // 이름
    if (!fields.name.value.trim()) {
      showError(fields.name, '이름을 입력하세요.');
      ok = false;
    }

    // 이메일
    const emailVal = fields.email.value.trim();
    if (!emailVal) {
      showError(fields.email, '이메일을 입력하세요.');
      ok = false;
    } else {
      // 간단한 이메일 패턴 체크
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!re.test(emailVal)) {
        showError(fields.email, '올바른 이메일 형식이 아닙니다.');
        ok = false;
      }
    }

    // 메시지
    if (!fields.message.value.trim()) {
      showError(fields.message, '메시지를 입력하세요.');
      ok = false;
    }

    return ok;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    // 2.5초 후 숨김
    setTimeout(() => {
      toast.classList.remove('show');
      toast.textContent = '';
    }, 2500);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;

    try {
      // 실제 서버가 없다면, 이 부분은 전송 시뮬레이션만 수행합니다.
      // fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...}) })
      await new Promise((r) => setTimeout(r, 400)); // UX용 짧은 대기

      form.reset();                 // 입력란 초기화
      clearErrors();                // 에러 메시지 초기화
      fields.name.focus();          // 포커스 초기화
      showToast('감사합니다. 메시지가 전송되었습니다.');
    } catch (err) {
      showToast('전송 중 문제가 발생했습니다. 잠시 후 다시 시도하세요.');
      console.error(err);
    } finally {
      submitBtn.disabled = false;
    }
  });

  // 실시간 에러 제거
  Object.values(fields).forEach((f) => {
    f.addEventListener('input', () => showError(f, ''));
  });
})();
