import { Card, ListGroup, Button } from 'react-bootstrap';

interface RepresentativePanelProps {
  name: string;
  points: string[]; // Array of points raised by the representative
}

const RepresentativePanel = ({ name, points }: RepresentativePanelProps) => {
  return (
    <Card className="mb-3">
      {/* Card Header with Representative Name */}
      <Card.Header as="h5">{name}</Card.Header>
      
      {/* List of Interesting Points */}
      <ListGroup variant="flush">
        {points.map((point, index) => (
          <ListGroup.Item key={index}>
            {point}
            {/* Button to Learn More */}
            <Button variant="outline-primary" size="sm" className="float-end">
              Learn More
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default RepresentativePanel;
