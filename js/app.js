// 탭 전환
const tabButtons = document.querySelectorAll(".cs-tab-btn");
const tabSections = document.querySelectorAll(".cs-tab");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach((b) => b.classList.remove("active"));
    tabSections.forEach((s) => s.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(`tab-${target}`).classList.add("active");
  });
});

// 더미 문의 목록 데이터
const dummyTickets = [
  {
    id: 1,
    status: "대기",
    type: "배송 지연",
    customer: "홍길동",
    orderNo: "20260313-000001",
    createdAt: "2026-03-13 09:12",
  },
  {
    id: 2,
    status: "처리 중",
    type: "결제 오류",
    customer: "김영희",
    orderNo: "20260312-000542",
    createdAt: "2026-03-13 09:30",
  },
  {
    id: 3,
    status: "완료",
    type: "상품 교환",
    customer: "이민수",
    orderNo: "20260311-000321",
    createdAt: "2026-03-12 16:20",
  },
];

const ticketTableBody = document.getElementById("ticketTableBody");

function renderTickets(list) {
  ticketTableBody.innerHTML = "";
  list.forEach((t) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.status}</td>
      <td>${t.type}</td>
      <td>${t.customer}</td>
      <td>${t.orderNo}</td>
      <td>${t.createdAt}</td>
    `;
    ticketTableBody.appendChild(tr);
  });
}

renderTickets(dummyTickets);

// 간단 검색 (문자 포함 여부만 체크)
const searchInput = document.getElementById("searchKeyword");
const searchBtn = document.getElementById("searchBtn");

function searchTickets() {
  const keyword = (searchInput.value || "").trim();
  if (!keyword) {
    renderTickets(dummyTickets);
    return;
  }
  const lower = keyword.toLowerCase();
  const filtered = dummyTickets.filter(
    (t) =>
      t.customer.toLowerCase().includes(lower) ||
      t.orderNo.toLowerCase().includes(lower) ||
      t.type.toLowerCase().includes(lower)
  );
  renderTickets(filtered);
}

searchBtn.addEventListener("click", searchTickets);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchTickets();
});

// 처리 내용 "저장" 버튼 (실제 저장은 아니고, 안내 메시지만)
const saveBtn = document.getElementById("saveBtn");
const answerText = document.getElementById("answerText");
const statusSelect = document.getElementById("statusSelect");
const saveMessage = document.getElementById("saveMessage");

saveBtn.addEventListener("click", () => {
  const answer = (answerText.value || "").trim();
  if (!answer) {
    saveMessage.style.color = "#c05621";
    saveMessage.textContent = "답변 내용을 입력한 후 저장해 주세요.";
    return;
  }

  const statusLabel = {
    WAIT: "처리 대기",
    PROGRESS: "처리 중",
    DONE: "처리 완료",
  }[statusSelect.value];

  saveMessage.style.color = "#2f855a";
  saveMessage.textContent = `저장되었습니다. (현재 상태: ${statusLabel})`;

  setTimeout(() => {
    saveMessage.textContent = "";
  }, 3000);
});

