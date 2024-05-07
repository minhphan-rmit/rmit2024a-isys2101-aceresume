import ScoreBar from "./ScoreBar";
import Strength from "./Strength";
import Suggestion from "./Suggestion";
import Weakness from "./Weakness";
import axios from 'axios';
import {useEffect, useState} from 'react';
const YourAnalysis = () => {
    const userId = '663852ecd568222769540792';

    const [analysis, setAnalysis] = useState<any>(null);


    useEffect(() => {
        const resumeId = localStorage.getItem('resumeId');
        console.log('Resume ID:', resumeId);
        if (resumeId){
        getAnalysis(resumeId);}
    }, []);

    const getAnalysis = async (resumeId: string) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/aceresume/resume/${userId}/${resumeId}/get_analysis`);
        console.log('Analysis:', response.data);
        setAnalysis(response.data);

    }catch (error) {
        console.error('Error getting analysis:', error);
        alert('Error getting analysis');
    }
}


    return (
        <>
         <div className="flex flex-col p-10 items-start  w-full text-gray-700 bg-white rounded-lg shadow-lg">
       <ScoreBar score={60} />
  </div>
  <div className="flex flex-col  items-end w-full p-10 text-gray-700 bg-white rounded-lg shadow-lg">
  < h2 className=" text-3xl font-bold text-gray-700">
				 Strength
			</h2>
            {analysis && analysis.pros && analysis.pros.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    {analysis.pros.map((pro, index) => (
                        <li key={index} className="text-gray-600 text-sm md:text-base">
                            {pro}
                        </li>
                    ))}
                </ul>
            )}
  </div>
  <div className="flex flex-col p-10 items-end w-full text-gray-700 bg-white rounded-lg shadow-lg">
  < h2 className=" text-3xl font-bold text-gray-700">
				 Weakness
			</h2>
            {analysis && analysis.cons && analysis.cons.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    {analysis.pros.map((pro, index) => (
                        <li key={index} className="text-gray-600 text-sm md:text-base">
                            {pro}
                        </li>
                    ))}
                </ul>
            )}
  </div>
  <div className="flex flex-col p-10 items-end w-full text-gray-700 bg-white rounded-lg shadow-lg">
    < h2 className=" text-3xl font-bold text-gray-700">
				 Suggestion
			</h2>
            {analysis && analysis.add_ons && analysis.add_ons.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    {analysis.pros.map((pro, index) => (
                        <li key={index} className="text-gray-600 text-sm md:text-base">
                            {pro}
                        </li>
                    ))}
                </ul>
            )}
  </div></>
    )
}
export default YourAnalysis;