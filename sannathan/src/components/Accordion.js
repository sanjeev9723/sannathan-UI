import Accordion from 'react-bootstrap/Accordion';

function BasicAccordion({ items }) {
  return (
    <Accordion defaultActiveKey="0" >
      {items.map((item, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Body>{item.content}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default BasicAccordion;
