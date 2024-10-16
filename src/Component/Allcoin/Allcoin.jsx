import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { base_url, end_url } from '../../Api/Api';

const Allcoin = () => {

  const api = base_url + end_url.category;
  const [state, setState] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null); // Store selected coin details for the modal

  useEffect(() => {
    const getProduct = () => {
      axios.get(api)
        .then(result => {
          setState(result.data.data)
        })
        .catch(error => {
          console.log("Error", error);
        });
    };
    getProduct();
  }, [api]);

  const [search, setSearch] = useState("");

  const Refresh = () => {
    window.location.reload();
  }

  const handleShow = (id) => {
    axios.get(`https://api.coincap.io/v2/assets/${id}`)
      .then(result => {
        setSelectedCoin(result.data.data);  // Store selected coin details
        setShow(true);  // Open modal
      })
      .catch(error => {
        console.log("Axios Error", error);
      });
  }

  const handleClose = () => setShow(false); // Close modal

  return (
    <section className='py-5 bg-light'>
      <Container>
        <h2 className='text-center mb-4'>Cryptocurrency List</h2>
        <Form>
          <Row className='align-items-center'>
            <Col md={8} xs={12}>
              <Form.Group controlId="basicsearch" className='mb-3 mb-md-0'>
                <Form.Control type='text' placeholder='Search Cryptocurrency by Name' onChange={(event) => { setSearch(event.target.value) }} className='search-input' />
              </Form.Group>
            </Col>
            <Col md={4} xs={12} className='text-md-end'>
              <Button variant='success' onClick={Refresh} className='ms-md-3 w-100 w-md-auto'>Refresh</Button>
            </Col>
          </Row>
        </Form>

        <Table striped bordered hover responsive="sm" className='mt-4'>
          <thead className='bg-primary text-white'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state?.filter((item) => {
              if (search === "") {
                return item;
              } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return item;
              }
            }).map((ele, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.symbol}</td>
                <td>
                  <Button variant='success' size='sm' onClick={() => handleShow(ele.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for showing coin details */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Coin Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCoin ? (
              <>
                <h4>Rank: {selectedCoin.rank}</h4>
                <h5>Name: {selectedCoin.name}</h5>
                <p>Symbol: {selectedCoin.symbol}</p>
                <p>Price (USD): {selectedCoin.priceUsd}</p>
                <p>Market Cap: {selectedCoin.marketCapUsd}</p>
                <p>Change (24h): {selectedCoin.changePercent24Hr}%</p>
                <p>Volumeused (24h) : {selectedCoin.volumeUsd24Hr}</p>
                <p>Explor (Site) : <a href={selectedCoin.explorer} target='_blank' className="text-decoration-none">visit</a></p>
              </>
            ) : (
              <p>Loading details...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
}

export default Allcoin;

