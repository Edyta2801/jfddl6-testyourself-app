import React from 'react';
import Button from './Button'
import Paper from 'material-ui/Paper'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'
import PieChart from './PieChart'
import BarChart from './BarChart'
import { database } from '../../firebase'

const style = {
    paper: {
        margin: 10,
        padding: 10
    }
}

class DashboardView extends React.Component {
    state = {
        viewportWidth: window.innerWidth,
        dataTimeStamps: ''
    }

    componentDidMount() {
        database.ref(`/usersLogins/loginsLogs`).on(
            'value',
            snapshot => {
                this.setState({ dataTimeStamps: Object.values(snapshot.val()).map(el => Object.values(el)[0]) })
                console.log(this.state.dataTimeStamps)
            }
        )
        this.todayMidnightTimeStamp()
        window.addEventListener(
            'resize',
            this.resizeListener
        )
    }

    oneDay=()=>{
        
    }

    todayMidnightTimeStamp=()=>{
        const now = new Date()
        const todayMidnightTimestmap = now.getTime()
        - now.getHours() * 60 * 60 * 1000
        - now.getMinutes() * 60 * 1000
        - now.getSeconds() * 1000
        - now.getMilliseconds()
        console.log(todayMidnightTimestmap)
    }
    



    resizeListener = () => {
        console.log(window.innerWidth)
        this.setState({
            viewportWidth: window.innerWidth
        })
    }

    render() {
        return (
            <Paper
                style={style.paper}>
                <Grid>
                    <Row middle="xs" center='xs'>
                        <Col lg={4}>
                            <Link to='./List'>
                                <Button
                                    label={'Go To List'}
                                />
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <Link to='./favourite-tests-list'>
                                <Button
                                    label={'Go To Favourites'}
                                />
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <Link to='/add-tests'>
                                <Button
                                    label={'Add New Test'}
                                />
                            </Link>
                        </Col>
                    </Row>
                    <Row middle="xs" center='xs'>
                        <Col lg={6}>
                            <Row middle="xs" center='xs'>
                                <PieChart
                                    viewportWidth={this.state.viewportWidth}
                                />
                            </Row>
                        </Col>
                        <Col lg={6}>
                            <Row middle="xs" center='xs'>
                                <BarChart
                                    viewportWidth={this.state.viewportWidth}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Paper>

        )
    }

    componentWillUnmount() {
        window.removeEventListener(
            'resize',
            this.resizeListener
        )
    }
}

export default DashboardView
