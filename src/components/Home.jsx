import { useState, useEffect } from 'react'
import useFetchTime from '../customHooks/useFetchTime'
import LiveClock from './LiveClock'
import Translator from './Translator.jsx'
import coords from './coords.json'
import months from './months.json'
import arabic_months from './arabic_months.json'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { getDate } from 'bangla-calendar';



const Home = () => {

	const today = new Date()
	const dayToday = today.getDate()
	const monthToday = today.getMonth() + 1
	const yearToday = today.getFullYear()
	
	console.log(`${dayToday} - ${monthToday} - ${yearToday}`)
	
	const bengaliYear = getDate(today).split(',')[2]
	const bengaliDate = getDate(today).split(',')[1]
	
	console.log(getDate(today))

	const [year, setYear] = useState(yearToday)
	const [month, setMonth] = useState(monthToday)
	const [day, setDay] = useState(dayToday)
	const [lat, setLat] = useState('23.71115253')
	const [long, setLong] = useState('90.4111451')
	
	const [selectedDate, setSelectedDate] = useState(today)

	const daySelect = selectedDate.getDate()
	const monthSelect = selectedDate.getMonth() + 1
	const yearSelect = selectedDate.getFullYear()

	console.log(daySelect, monthSelect, yearSelect)
	console.log(dayToday, monthToday, yearToday)


	let [fetchTime, refetch] = useFetchTime(year, month, lat, long)
	//const dayTimings = fetchTime?.data?.find((singledate)=>singledate.date.gregorian.day === daySelect)
	const dayTimings = fetchTime?.data?.[daySelect-1].timings
	const dayDateDetails = fetchTime?.data?.[daySelect-1].date

	console.log(dayDateDetails)
	
	const weekday = dayDateDetails?.gregorian?.weekday?.en
	let t_weekday;
	if(weekday){
		t_weekday = Translator(weekday)
	}
	
	
	const hijriday = dayDateDetails?.hijri?.day
	let t_hijriday;
	if(hijriday){
		t_hijriday = Translator(hijriday)
	}
	
	
	const hijrimonth = dayDateDetails?.hijri?.month?.number
	const t_hijrimonth =  arabic_months[hijrimonth]	
	

	const hijriyear = dayDateDetails?.hijri?.year
	let t_hijriyear;
	if(hijriyear){
		t_hijriyear = Translator(hijriyear)
	}
	








	const modifiedTimings = {}

	for (const key in dayTimings){
		if (Object.hasOwnProperty.call(dayTimings, key)) {
			const element = dayTimings[key]
			const hours = Number(element.slice(0,2))
			
			const amHours = hours - 12
			const strAmHours = amHours  + ""

			if (hours > 12){
				modifiedTimings[key] = Translator( `${ strAmHours   + element.slice(2,5)}`)

			} else{
				modifiedTimings[key] = Translator(`${element.slice(0,5)}`);
			}
		}

	}



	console.log(modifiedTimings)

	const handleDateChange = (date) => {
		setSelectedDate(date)
		refetch();
		console.log(selectedDate,"eitaaaa")
		if(date){

			const daySelect = date.getDate()
			const monthSelect = date.getMonth() + 1
			const yearSelect = date.getFullYear()


			setYear(yearSelect)
			setMonth(monthSelect)
			setDay(daySelect)
		}

	}
	
	const handleReturnToday = () =>{
		setSelectedDate(today)
		refetch()

		setYear(yearToday)
		setMonth(monthToday)
		setDay(dayToday)

	}



  	const [selectedDist, setSelectedDist] = useState("ঢাকা");
	
	{/*Dropdown handler starts here*/}
	const handleDistChange = (event) =>{
		const selectedDistName = event.target.value
		
		const targetDistrictData = coords.districts.find((districtData) => districtData.bn_name === selectedDistName)

		if (targetDistrictData){
			setLat(targetDistrictData.lat);
			setLong(targetDistrictData.long)
			setSelectedDist(selectedDistName)
		}
	}
	{/*Dropdown handler ends here*/}
	
	return (
		<div className="p-1">
			{/*First div starts here*/}
			<div className="flex justify-between">
				<div className="flex gap-12">
				<div className="font-siyam-rupali text-4xl">
					,,,উদাহরণ,,, জামে মসজিদ
				</div>


				
				<div className="w-fit font-siyam-rupali">
					{/*Dropdown code starts here*/}
					
						<select id="districtSelect" onChange={handleDistChange} className="font-siyam-rupali text-4xl w-full rounded px-2 py-1">

							{

								coords.districts.map((district)=>(

											<option key={district.id} value={district.bn_name} className="font-siyam-rupali text-4xl w-full">
													{district.bn_name}
											</option>



								))

							}

						</select> 	


					{/*Dropdown code ends here*/}

				</div>
				</div>






				<div className="inline-block w-fit">
					<LiveClock/>
				</div>

			</div>
			{/*First div ends here*/}
			
			<div className="m-2 bg-gray-200 w-full h-0.5 mx-auto"></div>

			{/*Secoond div starts here*/}
			
			<div className="flex justify-between text-xl mt-2 mx-12">
	
{
(dayToday === daySelect && monthToday === monthSelect && yearToday === yearSelect) ? 
(
				<div className="font-siyam-rupali text-emerald-600">
					এখন আজকের নামাজ ও রোজার সময় দেখানো হচ্ছে 

				</div> ):( 

				<div className="flex flex-col">
				<div className="font-siyam-rupali text-red-600">

এখন আজকের নামাজ ও রোজার সময় দেখানো হচ্ছে না!!! <br/>
 {Translator(daySelect + '')} - {Translator(monthSelect + '')} - {Translator(yearSelect + '')}  তারিখের নামাজ ও রোজার সময় দেখানো হচ্ছে

				</div>
				</div>

				) 


}

				<div className="flex gap-5">
					<div className="flex flex-col">

					<div className="font-siyam-rupali text-amber-600">

						অন্য কোন তারিখ নির্বাচন করতে ডান পাশের তারিখে ক্লিক করুন

					</div>

{

(dayToday === daySelect && monthToday === monthSelect && yearToday === yearSelect) ? 
<></>:
(

					<button onClick={handleReturnToday} className="bg-emerald-400 px-12 py-1 rounded">
					আজকের তারিখে ফিরতে এই সবুজ বাটনে ক্লিক করুন
					</button>

)
}				
					</div>

					
					<div className="w-48 border border-amber-400 p-1 h-12">

					      <DatePicker
						selected={selectedDate}
						onChange={(date)=>{handleDateChange(date);}}
						dateFormat="dd MMMM yyyy"
						showYearDropdown = {true}
						scrollableYearDropdown = {true}
						showMonthDropdown = {true}
					      />

					</div>

				</div>

			</div>

			{/*Secoond div ends here*/}

			<div className="m-2 bg-gray-200 w-11/12 mx-auto h-0.5"></div>

			{/*Third div starts here*/}
				<div className="text-xl flex justify-between w-11/12 mx-auto">
					<div className="justify-first">
						সূর্যোদয়      {modifiedTimings.Sunrise}
					</div>
					<div className="justify-center">
						আজ  
						<div className="w-2 inline-block"></div>
						{t_weekday}, {Translator(dayToday+"")} {  months[(monthToday + "")]}, {Translator(yearToday+"")} 
						<div className="w-2 inline-block"></div>
						খ্রিস্টাব্দ         
						|      {bengaliDate}, {bengaliYear} 
						<div className="w-2 inline-block"></div>
						বঙ্গাব্দ       
						|   {t_hijriday} {t_hijrimonth}, {t_hijriyear}
						<div className="w-2 inline-block"></div>
						হিজরি
					</div>
					<div className="justify-end">
						সূর্যাস্ত          {
modifiedTimings.Sunset}
					</div>
				</div>
			{/*Third div ends here*/}
	
		</div>
	);
};

export default Home;
