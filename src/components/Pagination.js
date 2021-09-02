import {useEffect, useState} from 'react'
import {Flex,Button} from '@chakra-ui/react'
import axios from 'axios'
import FlashCard from './FlashCard';

// state: how many cards we've gone through

function Pagination ({deck}) {
    // Set current cards
    const [cards, setCards] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1)
    

    let getFlashCards = async (page) => {
        try {
            const data = await axios.get(`http://localhost:3005/states?_page=${page}&_limit=5`);  

            console.log('data',data)

            setCards(prev => data)
            setLoaded(prev => !prev)

            return data;       

        } catch (e) {
            console.error(e)
        }
    }

    const handleNext = () => {
        setPage(prev  => {
            console.log('previous page ',prev);
            let current = Number(prev) + 1
            console.log('current page ', current)
            return current;
        })
        
    }
    
    useEffect(() => {
        // import axios, and paginate results in db.json
        getFlashCards(page);
        console.log('did it')
        // setCards(cards)
    }, [page])
    
    return (
        <Flex flexDirection="column" align="center">

            {console.log('what is cards? ',cards)}

            {loaded && cards.data.map(card => <FlashCard key={card.id} cardData={card} />)}

            <Button onClick={handleNext}>
                Next
            </Button>

        </Flex>
    )
}

export default Pagination;
