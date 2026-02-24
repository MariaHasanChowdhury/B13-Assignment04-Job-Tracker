const jobList = document.getElementById("job-list");
const interviewCountEl = document.getElementById("interview-count");
const rejectedCountEl = document.getElementById("rejected-count");
const totalCountEl = document.getElementById("total-count");
const tabCountEl = document.getElementById("tab-count");
const emptyState = document.getElementById("empty-state");

let interviewCount = 0;
let rejectedCount = 0;

// EVENT DELEGATION
jobList.addEventListener("click", (e) => {
  const card = e.target.closest(".job-card");

  // INTERVIEW
  if (e.target.classList.contains("interview-btn")) {
    if (card.dataset.status === "rejected") rejectedCount--;
    if (card.dataset.status !== "interview") interviewCount++;

    card.dataset.status = "interview";
    updateCounts();
  }

  // REJECTED
  if (e.target.classList.contains("rejected-btn")) {
    if (card.dataset.status === "interview") interviewCount--;
    if (card.dataset.status !== "rejected") rejectedCount++;

    card.dataset.status = "rejected";
    updateCounts();
  }

  // DELETE
  if (e.target.closest(".delete-btn")) {
    if (card.dataset.status === "interview") interviewCount--;
    if (card.dataset.status === "rejected") rejectedCount--;

    card.remove();
    updateCounts();
  }
});

// TABS
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
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

// UPDATE COUNTS
function updateCounts() {
  interviewCountEl.innerText = interviewCount;
  rejectedCountEl.innerText = rejectedCount;
  totalCountEl.innerText = document.querySelectorAll(".job-card").length;
}