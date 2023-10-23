import React, { useState } from 'react'
import './rr.css'
import Button from '../utils/Button';
import userData from '../data/userData.json';
import { useNavigate } from 'react-router-dom';

const Aptitude_form = () => {
    const navigate = useNavigate();
    let sortable = [];

    var categs = {
        "R": "Realistic", "I": "Investigative", "A": "Artistic", "S": "Social",
        "E": "Enterprising", "C": "Conventional"
    };
    function check() {
        // var r = alert("Are you sure you have completed the test?");
        // if (r == true) {
        const ilen = document.querySelectorAll('.i[type="checkbox"]:checked').length;
        const alen = document.querySelectorAll('.a[type="checkbox"]:checked').length;
        const rlen = document.querySelectorAll('.r[type="checkbox"]:checked').length;
        const slen = document.querySelectorAll('.s[type="checkbox"]:checked').length;
        const elen = document.querySelectorAll('.e[type="checkbox"]:checked').length;
        const clen = document.querySelectorAll('.c[type="checkbox"]:checked').length;

        const codes = {
            "r": rlen,
            "i": ilen,
            "a": alen,
            "s": slen,
            "e": elen,
            "c": clen
        }
        let maxCode;
        let maxCode2;
        let maxValue = -1;
        let maxValue2 = -1;

        for (const code in codes) {
            if (codes[code] > maxValue) {
                maxCode2 = maxCode;
                maxValue2 = maxValue;
                maxCode = code;
                maxValue = codes[code];
            } else if (codes[code] > maxValue2) {
                maxCode2 = code;
                maxValue2 = codes[code];
            }
        }
        sortable = [
            maxCode, maxCode2
        ]
        //in Ascending order- [["R",0],["I",4],...]   .

    }

    const onCheck = () => {
        check()
        console.log(sortable)
        userData.push(sortable)
        console.log(userData)
        navigate('/quiz')
    }
    function resetForm() {
        document.getElementById("mainForm").reset();
    }
    return (
        <div>
            <div className="mx-[10%]">
                <h4 className='text-5xl text-yellow-600 font-bold text-center'>Psychometric Analysis</h4><br />
                <h4 className='text-4xl text-blue-400'>Tick all the items that are appealing to you - leave the rest unchecked.</h4><br />
                <form id="mainForm">
                    <div className="pure-g">
                        <div className="pure-u-8-24 mr-5">
                            <label><input className="i" type="checkbox" name='option1' />&nbsp;Do puzzles</label><br /><br />
                            <label><input className="r" type="checkbox" name='option2' />&nbsp;Work on cars</label><br /><br />
                            <label><input className="a" type="checkbox" name='option3' />&nbsp;Attend concerts, theaters or art exhibits</label><br /><br />
                            <label><input className="s" type="checkbox" name='option4' />&nbsp;Work in teams</label><br /><br />
                            <label><input className="c" type="checkbox" name='option5' />&nbsp;Organize things like files, offices or activities</label><br /><br />
                            <label><input className="e" type="checkbox" name='option6' />&nbsp;Set goals for yourself</label><br /><br />
                            <label><input className="r" type="checkbox" name='option7' />&nbsp;Build things</label><br /><br />
                            <label><input className="a" type="checkbox" name='option8' />&nbsp;Read fiction, poetry or plays</label><br /><br />
                            <label><input className="c" type="checkbox" name='option9' />&nbsp;Have clear instructions to follow</label><br /><br />
                            <label><input className="e" type="checkbox" name='option10' />&nbsp;Influence or persuade people</label><br /><br />
                            <label><input className="i" type="checkbox" name='option11' />&nbsp;Do experiments</label><br /><br />
                            <label><input className="s" type="checkbox" name='option12' />&nbsp;Teach or train people</label><br /><br />
                            <label><input className="s" type="checkbox" name='option13' />&nbsp;Help people solve their problems</label><br /><br />
                            <label><input className="r" type="checkbox" name='option14' />&nbsp;Take care of animals</label><br /><br />
                        </div>
                        <div className="pure-u-8-24 mr-4">
                            <label><input className="c" type="checkbox" name='option1' />&nbsp;Have your day structured</label><br /><br />
                            <label><input className="e" type="checkbox" name='option2' />&nbsp;Sell things</label><br /><br />
                            <label><input className="a" type="checkbox" name='option3' />&nbsp;Do creative writing</label><br /><br />
                            <label><input className="i" type="checkbox" name='option4' />&nbsp;Work on Science Projects</label><br /><br />
                            <label><input className="e" type="checkbox" name='option5' />&nbsp;Take on new responsibilities</label><br /><br />
                            <label><input className="s" type="checkbox" name='option6' />&nbsp;Heal people</label><br /><br />
                            <label><input className="i" type="checkbox" name='option7' />&nbsp;Figure out how things work</label><br /><br />
                            <label><input className="r" type="checkbox" name='option8' />&nbsp;Put things together or assemble models</label><br /><br />
                            <label><input className="a" type="checkbox" name='option9' />&nbsp;Be creative</label><br /><br />
                            <label><input className="c" type="checkbox" name='option10' />&nbsp;Pay attention to details</label><br /><br />
                            <label><input className="c" type="checkbox" name='option11' />&nbsp;Do filing or typing</label><br /><br />
                            <label><input className="s" type="checkbox" name='option12' />&nbsp;Learn about other cultures</label><br /><br />
                            <label><input className="i" type="checkbox" name='option13' />&nbsp;Analyze things like problems, situations or trends</label><br /><br />
                            <label><input className="a" type="checkbox" name='option14' />&nbsp;Play instruments or sing</label><br /><br />
                        </div>
                        <div className="pure-u-8-24">
                            <label><input className="e" type="checkbox" name='option1' />&nbsp;Dream about starting your own business</label><br /><br />
                            <label><input className="r" type="checkbox" name='option2' />&nbsp;Cook</label><br /><br />
                            <label><input className="a" type="checkbox" name='option3' />&nbsp;Act in plays</label><br /><br />
                            <label><input className="r" type="checkbox" name='option4' />&nbsp;Think things through before making decisions</label><br /><br />
                            <label><input className="i" type="checkbox" name='option5' />&nbsp;Work with numbers or charts</label><br /><br />
                            <label><input className="s" type="checkbox" name='option6' />&nbsp;Discuss issues like politics or current events</label><br /><br />
                            <label><input className="c" type="checkbox" name='option7' />&nbsp;Keep records of your work</label><br /><br />
                            <label><input className="e" type="checkbox" name='option8' />&nbsp;Be a leader</label><br /><br />
                            <label><input className="r" type="checkbox" name='option9' />&nbsp;Work outdoors</label><br /><br />
                            <label><input className="c" type="checkbox" name='option10' />&nbsp;Work in an office</label><br /><br />
                            <label><input className="i" type="checkbox" name='option11' />&nbsp;Work on Math problems</label><br /><br />
                            <label><input className="s" type="checkbox" name='option12' />&nbsp;Help people</label><br /><br />
                            <label><input className="a" type="checkbox" name='option13' />&nbsp;Draw</label><br /><br />
                            <label><input className="e" type="checkbox" name='option14' />&nbsp;Give Speeches</label><br /><br />
                        </div>
                    </div>
                    <Button className="pure-button pure-button-primary" onClick={onCheck}>Submit</Button>&nbsp;&nbsp;<Button className="pure-button" onClick={resetForm}>Reset Form</Button>
                </form><br />

            </div>
        </div>
    )
}

export default Aptitude_form
