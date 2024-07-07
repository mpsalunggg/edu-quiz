import RulesImg from '../../assets/images/rules.svg'
const Rules = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
        <img src={RulesImg} alt="rules" className='w-96' />
        <ul className="list-disc px-4">
            <li>Ikuti kuis dengan Jujur</li>
            <li>Kerjakan sesuai waktu yang diberikan</li>
            <li>Waktu akan dimulai ketika soal sudah ditampilkan</li>
            <li>Apabila waktu telah selesai maka quiz akan otomatis tersubmit</li>
        </ul>
    </div>
  )
}
export default Rules