import { Card } from 'react-bootstrap';

interface SummaryBubbleProps {
  summaryText: string;
}

const SummaryBubble = ({ summaryText }: SummaryBubbleProps) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        {summaryText}
      </Card.Body>
    </Card>
  );
};

export default SummaryBubble;
