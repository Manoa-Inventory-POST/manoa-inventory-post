import React, { useState } from 'react';
import { Container, Image, Modal, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Room } from '../../api/room/RoomCollection';

/** Render the map of the 3rd floor of POST. */
const MapDataComponent = () => {
  const [modalToShow, setModalToShow] = useState(null);
  // const [descriptionToShow, setDescription] = useState(null);

  const handleModalClose = () => setModalToShow(null);

  const { rooms } = useTracker((selector, options) => {
    const subscription = Room.subscribe();
    const rdy = subscription.ready();
    const roomProfiles = Room.find({}, options).fetch();
    return {
      rooms: roomProfiles,
      ready: rdy,
    };
  }, []);

  const handleClick = (room) => {
    setModalToShow(room);
  };

  /** Render the map of the 3rd floor of POST. */
  return (
    <Container className="text-center">
      <Image src="/images/post_third_floor_highlight.png" id={PAGE_IDS.MAP} useMap="#floor-map" className="map_image" />
      <map name="floor-map" className="map-area">
        <area
          target="_self"
          alt="301"
          title="301"
          href="#"
          onClick={() => handleClick('301')}
          coords="291,646,336,673"
          shape="rect"
        />
        <area
          target="_self"
          alt="302"
          title="302"
          href="#"
          onClick={() => handleClick('301')}
          coords="288,675,340,675,341,790,261,789,262,711,262,673,262,645,288,645"
          shape="poly"
        />
        <area
          target="_self"
          alt="303A"
          title="303A"
          href="#"
          onClick={() => handleClick('303A')}
          coords="179,647,259,724"
          shape="rect"
        />
        <area
          target="_self"
          alt="303B"
          title="303B"
          href="#"
          onClick={() => handleClick('303B')}
          coords="97,726,177,790"
          shape="rect"
        />
        <area
          target="_self"
          alt="303C"
          title="303C"
          href="#"
          onClick={() => handleClick('303C')}
          coords="4,726,95,791"
          shape="rect"
        />
        <area
          target="_self"
          alt="303D"
          title="303D"
          href="#"
          onClick={() => handleClick('303D')}
          coords="5,723,68,644"
          shape="rect"
        />
        <area
          target="_self"
          alt="303E"
          title="303E"
          href="#"
          onClick={() => handleClick('303E')}
          coords="67,641,6,563,39,601"
          shape="rect"
        />
        <area
          target="_self"
          alt="303F"
          title="303F"
          href="#"
          onClick={() => handleClick('303F')}
          coords="5,479,69,561"
          shape="rect"
        />
        <area
          target="_self"
          alt="303G"
          title="303G"
          href="#"
          onClick={() => handleClick('303G')}
          coords="4,426,97,478"
          shape="rect"
        />
        <area
          target="_self"
          alt="304"
          title="304"
          href="#"
          onClick={() => handleClick('304')}
          coords="99,425,149,506"
          shape="rect"
        />
        <area
          target="_self"
          alt="305A"
          title="305A"
          href="#"
          onClick={() => handleClick('305A')}
          coords="100,317,149,371"
          shape="rect"
        />
        <area
          target="_self"
          alt="305B"
          title="305B"
          href="#"
          onClick={() => handleClick('305B')}
          coords="3,318,97,371"
          shape="rect"
        />
        <area
          target="_self"
          alt="305C"
          title="305C"
          href="#"
          onClick={() => handleClick('305C')}
          coords="3,238,69,315"
          shape="rect"
        />
        <area
          target="_self"
          alt="305D"
          title="305D"
          href="#"
          onClick={() => handleClick('305D')}
          coords="4,154,68,234"
          shape="rect"
        />
        <area
          target="_self"
          alt="305E"
          title="305E"
          href="#"
          onClick={() => handleClick('305E')}
          coords="4,73,68,152"
          shape="rect"
        />
        <area
          target="_self"
          alt="305F"
          title="305F"
          href="#"
          onClick={() => handleClick('305F')}
          coords="7,7,95,69"
          shape="rect"
        />
        <area
          target="_self"
          alt="305G"
          title="305G"
          href="#"
          onClick={() => handleClick('305G')}
          coords="99,181,148,287"
          shape="rect"
        />
        <area
          target="_self"
          alt="306A"
          title="306A"
          href="#"
          onClick={() => handleClick('306A')}
          coords="99,74,149,150"
          shape="rect"
        />
        <area
          target="_self"
          alt="306B"
          title="306B"
          href="#"
          onClick={() => handleClick('306B')}
          coords="102,8,176,68"
          shape="rect"
        />
        <area
          target="_self"
          alt="306C"
          title="306C"
          href="#"
          onClick={() => handleClick('306C')}
          coords="183,9,258,69"
          shape="rect"
        />
        <area
          target="_self"
          alt="306D"
          title="306D"
          href="#"
          onClick={() => handleClick('306D')}
          coords="200,74,260,148"
          shape="rect"
        />
        <area
          target="_self"
          alt="307A"
          title="307A"
          href="#"
          onClick={() => handleClick('307A')}
          coords="263,6,338,69"
          shape="rect"
        />
        <area
          target="_self"
          alt="307B"
          title="307B"
          href="#"
          onClick={() => handleClick('307B')}
          coords="344,7,422,97"
          shape="rect"
        />
        <area
          target="_self"
          alt="307C"
          title="307C"
          href="#"
          onClick={() => handleClick('307C')}
          coords="346,101,422,148"
          shape="rect"
        />
        <area
          target="_self"
          alt="308"
          title="308"
          href="#"
          onClick={() => handleClick('308')}
          coords="426,7,529,84"
          shape="rect"
        />
        <area
          target="_self"
          alt="309A"
          title="309A"
          href="#"
          onClick={() => handleClick('309A')}
          coords="534,72,614,148"
          shape="rect"
        />
        <area
          target="_self"
          alt="309B"
          title="309B"
          href="#"
          onClick={() => handleClick('309B')}
          coords="534,6,640,68"
          shape="rect"
        />
        <area
          target="_self"
          alt="309C"
          title="309C"
          href="#"
          onClick={() => handleClick('309C')}
          coords="535,73,613,150"
          shape="rect"
        />
        <area
          target="_self"
          alt="310B"
          title="310B"
          href="#"
          onClick={() => handleClick('310B')}
          coords="724,7,804,70"
          shape="rect"
        />
        <area
          target="_self"
          alt="310A"
          title="310A"
          href="#"
          onClick={() => handleClick('310A')}
          coords="726,75,776,149"
          shape="rect"
        />
        <area
          target="_self"
          alt="310C"
          title="310C"
          href="#"
          onClick={() => handleClick('310C')}
          coords="808,7,884,68"
          shape="rect"
        />
        <area
          target="_self"
          alt="311"
          title="311"
          href="#"
          onClick={() => handleClick('311')}
          coords="866,151,863,204,1007,202,1006,97,947,97,891,99,888,152"
          shape="poly"
        />
        <area
          target="_self"
          alt="312A"
          title="312A"
          href="#"
          onClick={() => handleClick('312A')}
          coords="1006,288,945,209"
          shape="rect"
        />
        <area
          target="_self"
          alt="312B"
          title="312B"
          href="#"
          onClick={() => handleClick('312B')}
          coords="1004,369,916,291"
          shape="rect"
        />
        <area
          target="_self"
          alt="312C"
          title="312C"
          href="#"
          onClick={() => handleClick('312C')}
          coords="910,369,863,292"
          shape="rect"
        />
        <area
          target="_self"
          alt="313"
          title="313"
          href="#"
          onClick={() => handleClick('313')}
          coords="860,426,911,504"
          shape="rect"
        />
        <area
          target="_self"
          alt="314A"
          title="314A"
          href="#"
          onClick={() => handleClick('314A')}
          coords="917,425,1005,480"
          shape="rect"
        />
        <area
          target="_self"
          alt="314B"
          title="314B"
          href="#"
          onClick={() => handleClick('314B')}
          coords="943,482,1008,557"
          shape="rect"
        />
        <area
          target="_self"
          alt="314C"
          title="314C"
          href="#"
          onClick={() => handleClick('314C')}
          coords="944,562,1007,642"
          shape="rect"
        />
        <area
          target="_self"
          alt="314D"
          title="314D"
          href="#"
          onClick={() => handleClick('314D')}
          coords="941,645,1009,721"
          shape="rect"
        />
        <area
          target="_self"
          alt="314F"
          title="314F"
          href="#"
          onClick={() => handleClick('314F')}
          coords="910,788,833,726"
          shape="rect"
        />
        <area
          target="_self"
          alt="314G"
          title="314G"
          href="#"
          onClick={() => handleClick('314G')}
          coords="830,790,753,727"
          shape="rect"
        />
        <area
          target="_self"
          alt="314H"
          title="314H"
          href="#"
          onClick={() => handleClick('314H')}
          coords="750,789,672,726"
          shape="rect"
        />
        <area
          target="_self"
          alt="314I"
          title="314I"
          href="#"
          onClick={() => handleClick('314I')}
          coords="588,699,669,789"
          shape="rect"
        />
        <area
          target="_self"
          alt="314E"
          title="314E"
          href="#"
          onClick={() => handleClick('314E')}
          coords="914,726,1006,788"
          shape="rect"
        />
        <area
          target="_self"
          alt="315"
          title="315"
          href="#"
          onClick={() => handleClick('315')}
          coords="562,645,667,697"
          shape="rect"
        />
        <area
          target="_self"
          alt="316"
          title="316"
          href="#"
          onClick={() => handleClick('316')}
          coords="507,645,560,698"
          shape="rect"
        />
        <area
          target="_self"
          alt="319"
          title="319"
          href="#"
          onClick={() => handleClick('319')}
          coords="635,429,804,584"
          shape="rect"
        />
        <area
          target="_self"
          alt="320"
          title="320"
          href="#"
          onClick={() => handleClick('320')}
          coords="914,726,1006,788"
          shape="rect"
        />
        <area
          target="_self"
          alt="317"
          title="317"
          href="#"
          onClick={() => handleClick('317')}
          coords="345,702,344,730,396,731,398,787,505,788,504,647,449,646,447,699"
          shape="poly"
        />
        <area
          target="_self"
          alt="318A"
          title="318A"
          href="#"
          onClick={() => handleClick('318A')}
          coords="207,429,209,582,450,584,452,514,472,509,470,430"
          shape="poly"
        />
        <area
          target="_self"
          alt="318B"
          title="318B"
          href="#"
          onClick={() => handleClick('318B')}
          coords="477,511,500,512,503,583,629,583,626,430,477,429"
          shape="poly"
        />
        <area
          target="_self"
          alt="322"
          title="322"
          href="#"
          onClick={() => handleClick('322')}
          coords="780,301,809,336"
          shape="rect"
        />
        <area
          target="_self"
          alt="323"
          title="323"
          href="#"
          onClick={() => handleClick('323')}
          coords="734,234,804,299"
          shape="rect"
        />
        <area
          target="_self"
          alt="324"
          title="324"
          href="#"
          onClick={() => handleClick('324')}
          coords="735,209,805,232"
          shape="rect"
        />
        <area
          target="_self"
          alt="328"
          title="328"
          href="#"
          onClick={() => handleClick('328')}
          coords="280,210,339,368"
          shape="rect"
        />
        <area
          target="_self"
          alt="329"
          title="329"
          href="#"
          onClick={() => handleClick('329')}
          coords="205,210,276,227"
          shape="rect"
        />
        <area
          target="_self"
          alt="330"
          title="330"
          href="#"
          onClick={() => handleClick('330')}
          coords="207,234,276,302"
          shape="rect"
        />
        <area
          target="_self"
          alt="331"
          title="331"
          href="#"
          onClick={() => handleClick('331')}
          coords="208,310,276,368"
          shape="rect"
        />
        <area
          target="_self"
          alt="321"
          title="321"
          href="#"
          onClick={() => handleClick('321')}
          coords="774,306,734,305,734,366,774,368,804,370,802,341,777,338"
          shape="poly"
        />
        <area
          target="_self"
          alt="325"
          title="325"
          href="#"
          onClick={() => handleClick('325')}
          coords="589,211,729,364"
          shape="rect"
        />
        <area
          target="_self"
          alt="326"
          title="326"
          href="#"
          onClick={() => handleClick('326')}
          coords="482,210,584,286"
          shape="rect"
        />
        <area
          target="_self"
          alt="327"
          title="327"
          href="#"
          onClick={() => handleClick('327')}
          coords="345,212,476,366"
          shape="rect"
        />
      </map>
      <Modal show={modalToShow !== null} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalToShow}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Room Information</h3>
          <p>Building Location: POST</p>
          <p>Description: {rooms.description}</p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>Room Image: </p>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img src="https://www.staradvertiser.com/wp-content/uploads/2017/01/web1_CTY-UH-Explosion-Report-084-1280x720.jpg" alt="temporary room image" width="200px" height="200px" />
        </Modal.Body>
        <Modal.Footer>
          {/* eslint-disable-next-line react/button-has-type */}
          <Button variant="danger" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MapDataComponent;
