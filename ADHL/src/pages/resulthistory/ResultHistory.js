import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import"./ResultHistory.css";
function ResultHistory() {
    const token = useSelector((state) => state.token);
    const age = useSelector((state) => state.age);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchResults = async () => {
            if (!token) {
                setError('Token is missing');
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append('Authorization',  `Bearer ${token}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch('http://127.0.0.1:8000/api/specified-results', requestOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.data) {
                   
                    setResults(result.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                setError('Failed to fetch results');
            }
        };

        fetchResults();
    }, [token]);

    const getIQLevel = (points) => {
        if (points === 95) return "that child is talented";
        if (points >= 90 && points <= 94) return "that child is superior";
        if (points >= 75 && points <= 89) return "that child is high average";
        if (points >= 50 && points <= 74) return "that child is average";
        if (points >= 25 && points <= 49) return "that child is less than average";
        if (points >= 10 && points <= 24) return "that child will have retardation";
        if (points >= 5 && points <= 9) return "that child is simple retardation";
        if (points < 5) return "that child is severe retardation";
    };

    const getPoints = (score, age) => {
        const ageRanges = {
            6: [[28, 36, 95], [24, 27, 90], [21, 23, 75], [17, 20, 50], [14, 16, 25], [11, 13, 10], [9, 10, 5], [0, 8, 0]],
            7: [[28, 36, 95], [27, 27, 90], [23, 26, 75], [19, 22, 50], [15, 18, 25], [13, 14, 10], [11, 12, 5], [0, 10, 0]],
            8: [[30, 36, 95], [29, 29, 90], [26, 28, 75], [21, 25, 50], [17, 20, 25], [15, 16, 10], [13, 14, 5], [0, 12, 0]],
            9: [[31, 36, 95], [30, 30, 90], [27, 29, 75], [23, 26, 50], [18, 22, 25], [17, 17, 10], [15, 16, 5], [0, 14, 0]],
            10: [[32, 36, 95], [31, 31, 90], [30, 30, 75], [26, 29, 50], [21, 25, 25], [18, 20, 10], [17, 17, 5], [0, 16, 0]],
            11: [[33, 36, 95], [29, 32, 90], [26, 28, 75], [21, 25, 50], [16, 20, 25], [15, 15, 10], [8, 14, 5], [0, 7, 0]],
            12: [[33, 36, 95], [29, 32, 90], [28, 28, 75], [23, 27, 50], [17, 22, 25], [16, 16, 10], [8, 15, 5], [0, 7, 0]],
            13: [[34, 36, 95], [32, 33, 90], [28, 31, 75], [23, 27, 50], [18, 22, 25], [16, 17, 10], [9, 15, 5], [0, 8, 0]],
            14: [[35, 36, 95], [34, 34, 90], [31, 33, 75], [26, 30, 50], [21, 25, 25], [19, 20, 10], [11, 18, 5], [0, 10, 0]],
            15: [[35, 36, 95], [32, 34, 90], [29, 31, 75], [25, 28, 50], [20, 24, 25], [18, 19, 10], [9, 17, 5], [0, 8, 0]]
        };

        const ranges = ageRanges[age];
        if (ranges) {
            for (let range of ranges) {
                if (score >= range[0] && score <= range[1]) {
                    return range[2];
                }
            }
        }
        return 0;
    };

    function splitScore(totalScore, percent1, percent2, percent3) {
        if (percent1 + percent2 + percent3 !== 100) {
            throw new Error("The sum of the percentages must be 100.");
        }

        let part1 = totalScore * (percent1 / 100);
        let part2 = totalScore * (percent2 / 100);
        let part3 = totalScore * (percent3 / 100);

        return {
            part1: part1,
            part2: part2,
            part3: part3
        };
    }

    const handleTestType = (testName) => {
        switch (testName) {
            case "CARS: Childhood Autism Rating Scale 2 ":
                return 1;
            case "Gilliam ":
                return 2;
            case "Prepared by: A. Naima Al-Waheeb - Attention Deficit Hyperactivity Distraction Test ":
                return 3;
            case "a. Dr. Jamal Al-Khatib, a scale for diagnosing cases of hyperactivity, attention deficit, and impulsivity in children ":
                return 4;
            case "Color Progressive Matrix Test raven":
                return 5;
            case "Learning Difficulties Scale, Dr. Zidan Al-Sartawy ":
                return 6;
            default:
                return null;
        }
    };

    const handleResult = (scorefinal, testType) => {
        switch (testType) {
            case 6:
                let totalScore = scorefinal;
                let part1 = 50;
                let part2 = 24;
                let part3 = 26;
                let count = 0;
                let result = splitScore(totalScore, part1, part2, part3);
                let { part1: part12, part2: part22, part3: part32 } = result;
                if (part12 >= 25 && part12 <= 53) {
                    count += 0;
                } else if (part12 > 53 && part12 <= 68) {
                    count += 1;
                } else if (part12 > 68 && part12 <= 125) {
                    count += 2;
                }
                if (part22 >= 12 && part22 <= 22) {
                    count += 0;
                } else if (part22 > 22 && part22 <= 28) {
                    count += 1;
                } else if (part22 > 28 && part22 <= 60) {
                    count += 2;
                }
                if (part32 >= 13 && part32 <= 21) {
                    count += 0;
                } else if (part32 > 21 && part32 <= 27) {
                    count += 1;
                } else if (part32 > 27 && part32 <= 65) {
                    count += 2;
                }

                if (count >= 4) {
                    return 'That child has learning difficulty.';
                } else {
                    return 'That child does not have learning difficulty.';
                }

            case 5:
                let points = getPoints(scorefinal, age);
                let message = getIQLevel(points);
                return message;

                case 3:
                    return scorefinal > 49 ? 'That child has ADHD' : 'That child does not have ADHD';
                    break;
                case 4:
                    return scorefinal > 90 ? 'That child has anxiety' : 'That child does not have anxiety';
                    break;

                case 1:
                    const autismScore = scorefinal / 3;
                    let degree = 0;
    
                    if (autismScore >= 0 && autismScore <= 14) {
                        degree = 1;
                    } else if (autismScore > 14 && autismScore <= 28) {
                        degree = 2;
                    } else if (autismScore > 28 && autismScore <= 43) {
                        degree = 3;
                    }
    
                    degree = degree * 3;
    
                    if (degree >= 7) {
                        return (<div><p>Child has autism</p></div>);
                    } else if (degree >= 4 && degree <= 6) {
                        return (<div><p>Child may have autism</p></div>);
                    } else if (degree >= 1 && degree <= 3) {
                        return (<div><p>Child likely does not have autism</p></div>);
                    }
                    break;
                case 2:
                    const autismSscondeScore = scorefinal / 6;
                    let degree2 = 0;
                    let autiusmpoint = 0;
    
                    if (autismSscondeScore >= 0 && autismSscondeScore <= 6) {
                        degree2 = 5;
                    } else if (autismSscondeScore > 6 && autismSscondeScore <= 9) {
                        degree2 = 6;
                    } else if (autismSscondeScore > 9 && autismSscondeScore <= 13) {
                        degree2 = 7;
                    } else if (autismSscondeScore > 13 && autismSscondeScore <= 16) {
                        degree2 = 8;
                    } else if (autismSscondeScore > 16 && autismSscondeScore <= 19) {
                        degree2 = 9;
                    } else if (autismSscondeScore > 19 && autismSscondeScore <= 22) {
                        degree2 = 10;
                    } else if (autismSscondeScore > 22 && autismSscondeScore <= 26) {
                        degree2 = 11;
                    } else if (autismSscondeScore > 26 && autismSscondeScore <= 29) {
                        degree2 = 12;
                    }
    
                    degree2 = degree2 * 6;
    
                    switch (degree2) {
                        case 72:
                            autiusmpoint = 140;
                            break;
                        case 71:
                            autiusmpoint = 139;
                            break;
                        case 70:
                            autiusmpoint = 138;
                            break;
                        case 69:
                            autiusmpoint = 137;
                            break;
                        case 68:
                            autiusmpoint = 136;
                            break;
                        case 67:
                            autiusmpoint = 135;
                            break;
                        case 66:
                            autiusmpoint = 134;
                            break;
                        case 65:
                            autiusmpoint = 133;
                            break;
                        case 64:
                            autiusmpoint = 132;
                            break;
                        case 63:
                            autiusmpoint = 131;
                            break;
                        case 62:
                            autiusmpoint = 130;
                            break;
                        case 61:
                            autiusmpoint = 129;
                            break;
                        case 60:
                            autiusmpoint = 128;
                            break;
                        case 59:
                            autiusmpoint = 127;
                            break;
                        case 58:
                            autiusmpoint = 126;
                            break;
                        case 57:
                            autiusmpoint = 125;
                            break;
                        case 56:
                            autiusmpoint = 124;
                            break;
                        case 55:
                            autiusmpoint = 123;
                            break;
                        case 54:
                            autiusmpoint = 122;
                            break;
                        case 53:
                            autiusmpoint = 121;
                            break;
                        case 52:
                            autiusmpoint = 120;
                            break;
                        case 51:
                            autiusmpoint = 119;
                            break;
                        case 50:
                            autiusmpoint = 118;
                            break;
                        case 49:
                            autiusmpoint = 117;
                            break;
                        case 48:
                            autiusmpoint = 116;
                            break;
                        case 47:
                            autiusmpoint = 115;
                            break;
                        case 46:
                            autiusmpoint = 114;
                            break;
                        case 45:
                            autiusmpoint = 113;
                            break;
                        case 44:
                            autiusmpoint = 112;
                            break;
                        case 43:
                            autiusmpoint = 111;
                            break;
                        case 42:
                            autiusmpoint = 110;
                            break;
                        case 41:
                            autiusmpoint = 109;
                            break;
                        case 40:
                            autiusmpoint = 108;
                            break;
                        case 39:
                            autiusmpoint = 107;
                            break;
                        case 38:
                            autiusmpoint = 106;
                            break;
                        case 37:
                            autiusmpoint = 105;
                            break;
                        case 36:
                            autiusmpoint = 104;
                            break;
                        case 35:
                            autiusmpoint = 103;
                            break;
                        case 34:
                            autiusmpoint = 102;
                            break;
                        case 33:
                            autiusmpoint = 101;
                            break;
                        case 32:
                            autiusmpoint = 100;
                            break;
                        case 31:
                            autiusmpoint = 99;
                            break;
                        case 30:
                            autiusmpoint = 98;
                            break;
                        case 29:
                            autiusmpoint = 97;
                            break;
                        case 28:
                            autiusmpoint = 96;
                            break;
                        case 27:
                            autiusmpoint = 95;
                            break;
                        case 26:
                            autiusmpoint = 94;
                            break;
                        case 25:
                            autiusmpoint = 93;
                            break;
                        case 24:
                            autiusmpoint = 92;
                            break;
                        case 23:
                            autiusmpoint = 91;
                            break;
                        case 22:
                            autiusmpoint = 90;
                            break;
                        case 21:
                            autiusmpoint = 89;
                            break;
                        case 20:
                            autiusmpoint = 88;
                            break;
                        case 19:
                            autiusmpoint = 87;
                            break;
                        case 18:
                            autiusmpoint = 86;
                            break;
                        case 17:
                            autiusmpoint = 85;
                            break;
                        case 16:
                            autiusmpoint = 84;
                            break;
                        case 15:
                            autiusmpoint = 83;
                            break;
                        default:
                            return (<div><p>Invalid score</p></div>);
                    }     
    
                    if(autiusmpoint=>83&&autiusmpoint <= 90){
                        return (<div><p>chiled doesnt have autism and autismScore: {autiusmpoint}</p></div>);
                    }
                    else if(autiusmpoint>90&&autiusmpoint <= 110){
                        return (<div><p>chiled may be  have autism and autismScore: {autiusmpoint}</p></div>);
                    }
                    else if(autiusmpoint>110&&autiusmpoint <= 140){
                        return (<div><p>chiled   have autism and autismScore: {autiusmpoint}</p></div>);
                    }

            default:
                return 'No test result available.';
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(results);

    function splitDateTime(dateTime) {
        // Example implementation, adjust as per your date/time format
        const date = new Date(dateTime);
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
        return `${formattedDate} ${formattedTime}`;
    }
      
    return (
        <div>
            <div className="container">
                {results.length > 0 ? (
                    results.map((res) => {
                        const testType = handleTestType(res['Test name']);
                        return (
                            <div className="d"key={res.id}>
                                <p>ID: {res.id}</p>
                                <p>Test Name: {res['Test name']}</p>
                                <p>Result: {res.Result}</p>
                                <p>Result: {handleResult(res.Result,handleTestType(res['Test name']))}</p>
                                <p>data: {splitDateTime(res['created_at'])}</p>
                                <p>time:{splitDateTime(res['updated_at'])}</p>
                            </div>
                        );
                    })
                ) : (
                    <div>No results found.</div>
                )}
            </div>
        </div>
    );
}

export default ResultHistory;
