/* PORTFOLIO AUTO SUMMARY*/
const portfolioSummary =
  "Marlyn Grullon is an aspiring Cybersecurity Analyst and AI College Student with hands-on experience in artificial intelligence, machine learning, and information security. " +
  "Her portfolio focuses on AI-driven threat detection, phishing email analysis, and cybersecurity data intelligence using Python. " +
  "She has built machine learning and NLP-based projects, including an AI phishing email detection system using supervised classification techniques. " +
  "Her work demonstrates understanding of SOC operations, security monitoring, and risk assessment. " +
  "She is actively seeking roles in cybersecurity, SOC analysis, and AI engineering.";

function autoSummarizePortfolio() {
  const log = document.getElementById("chat-log");
  const summaryBox = document.getElementById("summary-text");

  if (log) {
    log.innerHTML += `<br><br>${portfolioSummary}`;
    log.scrollTop = log.scrollHeight;
  }

  if (summaryBox) {
    summaryBox.textContent = portfolioSummary;
    // show the summary when ready
    document.getElementById("summary").style.display = "block";
  }
}
function downloadResume() {
  const link = document.createElement("a");
  link.href = "Marlyn-Grullon-Resume.pdf";
  link.download = "Marlyn-Grullon-Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function openResume() {
  window.open("Marlyn Grullon Resume.pdf", "_blank", "noopener");
}


/* CLOSE BUTTON  */
const close = document.getElementById("close");
if (close) {
  close.addEventListener("click", () => {
    const summary = document.getElementById("summary");
    if (summary) summary.style.display = "none";
  });
}

/* SKILLS RADAR CHART */
const ctx = document.getElementById("skillsChart");
if (ctx && window.Chart) {
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Cybersecurity", "Machine Learning", "Python", "Web Security", "NLP"],
      datasets: [{
        label: "Skill Level",
        data: [85, 80, 90, 75, 80],
        borderColor: "#00ffcc"
      }]
    }
  });
}

/* D3 OBSIDIAN-STYLE NODE GRAPH*/
const nodes = [
  { id: "Cybersecurity", group: "core" },
  { id: "Artificial Intelligence", group: "core" },
  { id: "Threat Detection" },
  { id: "Phishing Analysis" },
  { id: "SOC Operations" },
  { id: "Incident Response" },
  { id: "Web Security" },
  { id: "Machine Learning" },
  { id: "Natural Language Processing (NLP)" },
  { id: "Classification Models" },
  { id: "Python" },
  { id: "Scikit-learn" },
  { id: "Data Visualization" }
];

const links = [
  { source: "Cybersecurity", target: "Threat Detection" },
  { source: "Cybersecurity", target: "Phishing Analysis" },
  { source: "Cybersecurity", target: "SOC Operations" },
  { source: "Cybersecurity", target: "Incident Response" },
  { source: "Cybersecurity", target: "Web Security" },
  { source: "Artificial Intelligence", target: "Machine Learning" },
  { source: "Artificial Intelligence", target: "Natural Language Processing (NLP)" },
  { source: "Machine Learning", target: "Classification Models" },
  { source: "Natural Language Processing (NLP)", target: "Classification Models" },
  { source: "Machine Learning", target: "Python" },
  { source: "Machine Learning", target: "Scikit-learn" },
  { source: "Cybersecurity", target: "Artificial Intelligence" }
];
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
const svg = d3.select("#skillGraph");
if (svg.node()) {
  const width = svg.node().getBoundingClientRect().width || 800;
  const height = 500;

  svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(80))
    .force("charge", d3.forceManyBody().strength(-250))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link");

  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", d => d.group === "core" ? "node core" : "node")
    .attr("r", d => d.group === "core" ? 10 : 7)
    .on("mouseover", (_, d) => highlightNode(d))
    .on("mouseout", resetHighlight)
    .call(
      d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  const label = svg.append("g")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .text(d => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x + 10)
      .attr("y", d => d.y + 4);
  });

  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  function highlightNode(selected) {
    node.classed("dim", d => !isConnected(selected, d));
    link.classed("dim", d => d.source !== selected && d.target !== selected);
  }

  function resetHighlight() {
    node.classed("dim", false);
    link.classed("dim", false);
  }

  function isConnected(a, b) {
    return links.some(l =>
      (l.source.id === a.id && l.target.id === b.id) ||
      (l.source.id === b.id && l.target.id === a.id) ||
      a.id === b.id
    );
  }
}
function openModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  }
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (modal && e.target === modal) {
    modal.style.display = "none";
  }
});

/*AUTO SUMMARY ON LOAD */
window.addEventListener("load", () => {
  setTimeout(autoSummarizePortfolio, 1200);
});
