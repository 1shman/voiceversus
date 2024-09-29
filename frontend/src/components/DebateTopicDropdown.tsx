import { Form } from 'react-bootstrap';

const DebateTopicDropdown = () => {
  return (
    <Form.Group controlId="debate-topic">
      <Form.Label>Debate Topic:</Form.Label>
      <Form.Control as="select">
        <option value="cats-vs-dogs">Cats vs Dogs</option>
        <option value="technology-vs-nature">Technology vs Nature</option>
        {/* Add more options */}
      </Form.Control>
    </Form.Group>
  );
};

export default DebateTopicDropdown;
