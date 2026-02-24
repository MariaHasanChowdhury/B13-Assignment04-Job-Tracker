const jobList = document.getElementById("job-list");
const interviewCountEl = document.getElementById("interview-count");
const rejectedCountEl = document.getElementById("rejected-count");
const totalCountEl = document.getElementById("total-count");
const tabCountEl = document.getElementById("tab-count");
const emptyState = document.getElementById("empty-state");
const tabs = document.querySelectorAll(".tab-btn");

let interviewCount = 0;
let rejectedCount = 0;

// ================= EVENT DELEGATION =================
jobList.addEventListener("click", (e) => {
  const card = e.target.closest(".job-card");
  if (!card) return;

  const interviewBtn = card.querySelector(".interview-btn");
  const rejectedBtn = card.querySelector(".rejected-btn");

  // ---------------- INTERVIEW ----------------
  if (e.target.classList.contains("interview-btn")) {

    if (card.dataset.status === "rejected") rejectedCount--;
    if (card.dataset.status !== "interview") interviewCount++;

    card.dataset.status = "interview";

    // BUTTON STYLE
    interviewBtn.classList.add("bg-green-500", "text-white");
    interviewBtn.classList.remove("text-green-500");

    rejectedBtn.classList.remove("bg-red-500", "text-white");
    rejectedBtn.classList.add("text-red-500");

    setBadge(card, "Interview", "green");

    updateCounts();
  }

  // ---------------- REJECTED ----------------
  if (e.target.classList.contains("rejected-btn")) {

    if (card.dataset.status === "interview") interviewCount--;
    if (card.dataset.status !== "rejected") rejectedCount++;

    card.dataset.status = "rejected";

    // BUTTON STYLE
    rejectedBtn.classList.add("bg-red-500", "text-white");
    rejectedBtn.classList.remove("text-red-500");

    interviewBtn.classList.remove("bg-green-500", "text-white");
    interviewBtn.classList.add("text-green-500");

    setBadge(card, "Rejected", "red");

    updateCounts();
  }

  // ---------------- DELETE ----------------
  if (e.target.closest(".delete-btn")) {

    if (card.dataset.status === "interview") interviewCount--;
    if (card.dataset.status === "rejected") rejectedCount--;

    card.remove();
    updateCounts();
  }
});


// ================= TAB FUNCTION =================
tabs.forEach(btn => {
  btn.addEventListener("click", () => {

    // ACTIVE TAB STYLE
    tabs.forEach(b => {
      b.classList.remove("bg-blue-500", "text-white");
      b.classList.add("bg-white");
    });

    btn.classList.add("bg-blue-500", "text-white");
    btn.classList.remove("bg-white");

    const tab = btn.dataset.tab;
    let visible = 0;

    document.querySelectorAll(".job-card").forEach(card => {
      if (tab === "all" || card.dataset.status === tab) {
        card.classList.remove("hidden");
        visible++;
      } else {
        card.classList.add("hidden");
      }
    });

    tabCountEl.innerText = `${visible} jobs`;
    emptyState.classList.toggle("hidden", visible !== 0);
  });
});


// ================= BADGE FUNCTION =================
function setBadge(card, text, color) {

  let oldBadge = card.querySelector(".status-badge");
  if (oldBadge) oldBadge.remove();

  const badge = document.createElement("span");
  badge.className = `status-badge px-3 py-1 text-xs font-semibold rounded-full 
    ${color === "green" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`;

  badge.innerText = text;

  card.querySelector("h3").after(badge);
}


// ================= UPDATE COUNTS =================
function updateCounts() {
  interviewCountEl.innerText = interviewCount;
  rejectedCountEl.innerText = rejectedCount;
  totalCountEl.innerText = document.querySelectorAll(".job-card").length;
}