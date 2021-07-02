import React from 'react';
import { AutoComplete, Col, Row, Spin } from 'antd';
const { Option } = AutoComplete;
import Container from './Container';
import Title from './Title';
import BreedContainer from './BreedContainer';
import BreedImage from './BreedImage';
import BreedName from './BreedName';

const App = () => {
  const [isFetching, setIsFetching] = React.useState([]);
  const [allBreeds, setAllBreeds] = React.useState([]);
  const [filteredBreeds, setFilteredBreeds] = React.useState([]);

  React.useEffect(() => {
    getDogsFromServer();
  }, []);

  const getDogsFromServer = () => {
    setIsFetching(true);
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      const breedsArray = Object.keys(data.message);
      let objArray = breedsArray.map(o => {return {name: o, image: ''}});
      breedsArray.forEach((dog, idx, array) => {
        fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
        .then(response => response.json())
        .then(data => {
          const ok = objArray.map(function(e) { return e.name; }).indexOf(dog);
          if (objArray[ok]) { objArray[ok].image = data.message; }
          if (idx === array.length - 1){ 
            setIsFetching(false);
            setAllBreeds(objArray);
            setFilteredBreeds(objArray);
          }
        });
      });
    });
  }

  const onChange = (name) => {
    selectBreed(name);
  }
  
  const onSearch = (name) => {
    selectBreed(name);
  }

  const selectBreed = (name) => {
    setFilteredBreeds(!name ? allBreeds : allBreeds.filter(b => b.name.includes(name)));
  }

  return (
  <Container>
    <Row>
      <Col>
        <Title>Dog Breeds</Title>
      </Col>
      <Col flex="auto">
        <AutoComplete
          allowClear
          filterOption
          style={{ marginLeft: 16, width: 200 }}
          onChange={onChange}
          onSearch={onSearch}
          placeholder="Search dog breed"
        >
          {allBreeds.map(breed => <>
            { breed.image !== '' &&
            <Option key={breed.name} value={breed.name}>
              {breed.name}
            </Option>
            }
          </>)}
        </AutoComplete>
      </Col>
    </Row>
    <BreedContainer>
    { isFetching && <Spin size="large" />}
    <Row>
    { filteredBreeds.map((breed) => <>
      { breed.image !== '' &&
      <Col key={breed.name} xs={12} sm={10} md={8} lg={6} xl={6}>
        <BreedImage
          key={breed.name}
          height={200}
          width={'100%'}
          src={breed.image}
        />
        <BreedName>{breed.name}</BreedName>
      </Col>
      }
      </>
    )}
    </Row>
    </BreedContainer>
  </Container>
  );
}

export default App;