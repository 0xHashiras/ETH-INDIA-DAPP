import { useContext, useEffect, useState } from 'react';
import signup from "../assets/ash.png";
import Web3 from "web3";
import { createContext } from 'react';
import { useConnection } from '../App';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import Loading from './Loading';

const Item = styled(Paper)(({ theme }) => ({

    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderColor: 'transparent'
}));

function Mint() {

    const { connectionState } = useConnection();
    const { accounts, chainId, contract } = connectionState;
    // const [balance, setBalance] = useState(0);
    const [move, setMove] = useState();
    const [jump, setJump] = useState();
    const [shop, setShop] = useState('');
    const [battle, setBattle] = useState('');
    const [current, setCurrent] = useState(1);
    const [avatar, setAvatar] = useState({
        currLoc: 0,
        battlesWon: 0,
        potionsBal: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    // const battle = 100;

    const navigate = useNavigate();

    const moveOrJump = async (type) => {
        try {
            setIsLoading(true)
            if (contract) {
                let dest = type == 'move' ? move : jump;
                console.log("destination is", dest)
                await contract.methods.move(Number(dest)).send({ from: accounts });
                await getDetails();
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }

    }


    const clickGrid = (e) => {
        let id = e.target.innerText;
        console.log(id)
        if (id === 'SHOP') {
            setJump(0);
            setMove(0);
            setBattle('');
            setShop('SHOP')
        } else if (id === 'BATTLE') {
            setJump(0);
            setMove(0);
            setShop('');
            setBattle('BATTLE');
        } else if ((id == current + 1) || (id == current - 1) || (id == current + 10) || (id == current - 10) || (id == current + 11) || (id == current - 11) || (id == current + 9) || (id == current - 9)) {
            setJump(0);
            setMove(id);
            setShop('');
            setBattle('');
        } else {
            setMove(0);
            setJump(id);
            setShop('');
            setBattle('');
        }

    }

    const getDetails = async () => {
        let tokenownerIndex = await contract.methods.tokenOfOwnerByIndex(accounts, 0).call();
        let avatarDetails = await contract.methods.avatars(tokenownerIndex).call();
        console.log("token owner index", avatarDetails)
        setAvatar(avatarDetails);
        setCurrent(Number(avatarDetails.currLoc))
    }

    useEffect(() => {
        (async () => {
            if (contract) {
                await getDetails();
                // setBalance(balance)
            }
        })()


    }, []);

    if (isLoading) {
        return <Loading text="Moving Your Destination Please wait..." />;
    }


    return (
        <div className="play" id="">
            <div className='details'>
                <p className="title">Avatar Details :-</p>
                <span>Position: {avatar.currLoc}</span>
                <span>Battles Won: {avatar.battlesWon}</span>
                <span>Potion Balance: {avatar.potionsBal}</span>
            </div>
            <div className="container" style={{ paddingTop: '7rem' }}>
                <Card style={{ background: 'transparent' }}>
                    <Box sx={{ flexGrow: 1 }}>

                        <Grid style={{ background: 'transparent' }} onClick={(e) => clickGrid(e)} columns={10} container spacing={3}>
                            {Array.from({ length: 100 }, (_, i) => {
                                return (<Grid key={i + 1} data={i + 1} item xs={1}>
                                    {/* {i+1 == 25 ? <AwesomeButton type="primary">{i+1}</AwesomeButton> : <Item style={i + 1 == current ? { background: 'blue' } : i + 1 == move ? { background: 'green' } : i + 1 == jump ? { background: 'orange' } : {}} >{i + 1}</Item> } */}
                                    {i + 1 == 50 ? <Item style={'SHOP' == shop ? {
                                        background: `pink`, fontWeight: 'bold'
                                    } : { background: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) ),linear-gradient(101deg, var(--pink), var(--green))`, fontWeight: 'bold' }}>SHOP</Item>
                                        : i + 1 == 100 ? <Item style={'BATTLE' == battle ? {
                                            background: `pink`, fontWeight: 'bold'
                                        } : { background: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) ),linear-gradient(101deg, var(--pink), var(--green))`, fontWeight: 'bold' }}>BATTLE</Item> :
                                            <Item style={i + 1 == current ? {
                                                background: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) ),linear-gradient(101deg, var(--pink), var(--orange))`
                                            }
                                                : i + 1 == move ? { background: '#29e029' }
                                                    : i + 1 == jump ? { background: 'orange' }
                                                        : {}} >{i + 1}</Item>}
                                    {/* <AwesomeButton type="primary">{i+1}</AwesomeButton> */}

                                </Grid>)
                            })}
                        </Grid>
                    </Box>
                </Card>
                <br />
                <Grid container >
                    <Grid item xs={3}>
                        <Button disabled={!move} onClick={() => moveOrJump('move')} >
                            Move
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button disabled={!jump} onClick={() => moveOrJump('jump')} >
                            Jump
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color='primary'>
                            Shop
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" style={{ background: 'red' }}>
                            Battle
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" style={{ background: 'red' }}>
                            Advanced To Next Chain
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Mint;
