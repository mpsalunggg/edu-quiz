import NoItemImage from '../../assets/images/noitem.svg'
const NoItem = () => {
  return (
    <section className="flex flex-col items-center py-8 gap-4">
      <img src={NoItemImage} alt="noitem" className="w-96" />
      <p className="text-gray-400 italic">Maaf tidak terdapat data hehehe</p>
    </section>
  )
}
export default NoItem
