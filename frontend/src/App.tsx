import { Container, Row, Col } from "react-bootstrap";
import DebateTopicDropdown from "./components/DebateTopicDropdown";
import RepresentativePanel from "./components/RepresentativePanel";
import SummaryBubble from "./components/SummaryBubbles";

function App() {
  // Sample data for summaries and points
  const summaries = ["Summary A1", "Summary B1"];
  const repAPoints = [
    "Interesting Point 1 Raised",
    "Interesting Point 2 Raised",
  ];
  const repBPoints = [
    "Interesting Point 3 Raised",
    "Interesting Point 4 Raised",
  ];

  return (
    <Container fluid className="p-4">
      {/* Debate Topic Dropdown */}
      <Row className="mb-4">
        <Col>
          <DebateTopicDropdown />
        </Col>
      </Row>

      {/* Main Panels Layout */}
      <Row>
        {/* Left Panel - Representative A */}
        <Col md={3}>
          <RepresentativePanel name="Representative A" points={repAPoints} />
        </Col>

        {/* Center Summary Area */}
        <Col md={6}>
          <div className="debate-summary">
            {summaries.map((summary, index) => (
              <SummaryBubble key={index} summaryText={summary} />
            ))}
          </div>
        </Col>

        {/* Right Panel - Representative B */}
        <Col md={3}>
          <RepresentativePanel name="Representative B" points={repBPoints} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
