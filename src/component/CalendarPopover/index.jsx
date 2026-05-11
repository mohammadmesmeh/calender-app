import { IconBtn } from '../Buttons/IconBtn';
import '@fontsource/inter';
import { CONST } from "../../constants/const";
import { Day } from "../Day";
import { DayNum } from "../DayNum";
import { AddButtons } from "../Buttons/AddButtons";
import { ArrowLeft, ArrowRight, CalendarPlus } from 'lucide-react';
import { useDate } from '../../Hooks/useDate';

export const CalendarPopover = () => {
    const { 
        MONTH,
        YEAR,
        handleClickNextMonth,
        handleClickPrevMonth,
        monthName,
        NumFirstDayInMonth,
        PrevMonthDaysNumsArray,
        ThisMonthDaysNumsArray,
        thisDay,
        thisMonth,
        NextMonthDaysNumsArray,
        thisYear
    } = useDate()






    return (
        <>
            <div className="calendarPopover-container w-[284px] min-h-[364px]  p-4 shadow-md rounded-md border border-border text-text select-none">
                <div className=' flex w-full h-[32px] justify-between items-center'>
                    <IconBtn icon={ArrowLeft} onClick={handleClickPrevMonth} />
                    <p className=" w-full text-center h-21 font-medium text-[17px] font-sans capitalize">{monthName} {YEAR}</p>
                    <IconBtn icon={ArrowRight} onClick={handleClickNextMonth} />
                </div>
                <div className="week-days flex items-center justify-between w-full my-3 h-[36px] ">

                    {
                        CONST.DAYS__OF__WEEK.map((item) => (

                            <Day day={item.slice(0, 2)} className='text-text-muted text-sm' />



                        ))
                    }
                </div>

                <div className="days-in-month grid gap-[4px] grid-cols-7 grid-rows-6 my-3 w-full  ">

                    {
                        NumFirstDayInMonth !== 0 ? (

                            PrevMonthDaysNumsArray.slice(-NumFirstDayInMonth).map((item) => (
                                < DayNum content={item} className="text-text-muted" />


                            ))
                        ) : null

                    }


                    {
                        ThisMonthDaysNumsArray.map((item) => (
                            < DayNum content={item} className={item === thisDay && thisMonth === MONTH && thisYear === YEAR ? 'bg-primary text-white hover:text-text rounded-full' : ''} />

                        ))
                    }
                    {


                        NextMonthDaysNumsArray.slice(0, 42 - NumFirstDayInMonth - ThisMonthDaysNumsArray.length).map((item) => (
                            < DayNum content={item} className="text-text-muted " />


                        ))


                    }

                </div>
                <hr className="my-3" />
                <div className="Add-container mt-3 flex justify-end   item-end">
                    <AddButtons content='Add Event'  >
                        <CalendarPlus />
                    </AddButtons>
                </div>

            </div>

        </>
    )

}