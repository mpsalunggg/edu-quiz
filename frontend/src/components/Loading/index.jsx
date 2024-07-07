import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loading = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 55,
      }}
      spin
    />
  )

  return (
    <div className="w-full h-screen bg-tema-green flex justify-center items-center">
      <Spin indicator={antIcon} className="text-white"/>
    </div>
  )
}
export default Loading
