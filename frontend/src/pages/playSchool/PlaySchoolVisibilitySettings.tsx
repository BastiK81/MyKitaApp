import {useContext, useEffect} from "react";
import {Box, Card, CardContent, Slider, Typography} from "@mui/material";
import {PlaySchoolCom} from "../../services/PlaySchoolProvider";

const PlaySchoolVisibilitySettings = () => {

    const {
        playSchoolItem,
        getVisibility,
        kitaVisibility,
        setKitaVisibility,
        changeVisibility
    } = useContext(PlaySchoolCom);

    useEffect(() => {
        getVisibility(playSchoolItem.id)
        // eslint-disable-next-line
    }, []);

    const handleChange = (event: Event, newValue: number | number[]) => {
        let visibility = ''
        if (newValue === 50) {
            visibility = 'KITA'
        }
        if (newValue === 100) {
            visibility = 'PUBLIC'
        }
        setKitaVisibility(visibility)
        changeVisibility(playSchoolItem.id, visibility)
    };

    const getVisibilityValue = (): number => {
        if (kitaVisibility === 'PUBLIC') {
            return 100
        } else if (kitaVisibility === 'KITA') {
            return 50
        }
        return 0
    }

    const marks = [
        {
            value: 0,
            text: 'Private',
            label: 'Private',
        },
        {
            value: 50,
            text: 'Kita',
            label: 'Kita',
        },
        {
            value: 100,
            text: 'Public',
            label: 'Public',
        }
    ];

    function valuetext(value: number) {
        marks.forEach((item) => {
            if (item.value === value) {
                return item.text
            }
        })
        return ''
    }

    function valueLabelFormat(value: number) {
        return marks.findIndex((mark) => mark.value === value) + 1;
    }

    return (
        <Card sx={{width: 350}}>
            <CardContent>
                <Box sx={{width: 300}}>
                    <Typography id="input-slider" gutterBottom>
                        Kita Visibility
                    </Typography>
                    <Slider
                        aria-label="Restricted values"
                        value={getVisibilityValue()}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                        onChange={handleChange}
                    />
                </Box>
            </CardContent>
        </Card>
    )

}

export default PlaySchoolVisibilitySettings