import { useState } from 'react'

function App() {
	const endPoint = 'https://cloud-api.yandex.net/v1/disk/public/resources'
	const folderPublicKey = 'https://Путь к папке публикации'
	const path =
		'Тут должен быть путь к загружаемому ресурсу в формате URL, но я не смог разобраться как именно названия файлов кодировать в формат URL'

	const [files, setFiles] = useState([])

	const handleFileChange = (e) => {
		setFiles([...e.target.files])
	}
	const handleUpload = async () => {
		if (files === 0) {
			console.log('Файлы не выбраны')
			return
		}
		if (files > 100) {
			console.log('Слишком много файлов')
		}

		const data = new FormData()

		files.forEach((file) => {
			data.append('choosenFile', file)
		})

		try {
			const respone = await fetch(
				endPoint + '/?public_key=' + folderPublicKey + '&path=' + path,
				{
					method: 'PUT',
					body: data,
				}
			)
			if (respone.ok) {
				console.log(respone)
			} else {
				console.log(respone)
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	console.log(files)

	return (
		<div className="flex w-3/4 mx-auto justify-center  py-10">
			<label className="text-gray-100 text-2xl mt-2 flex items-center justify-center  border-separate cursor-pointer ">
				Выбор и загрузка файлов в Яндекс.диск
				<input
					className="hidden"
					type="file"
					multiple
					onChange={handleFileChange}
				/>
			</label>
			<div className="flex gap-8 justify-center mt-4 items-center">
				<button
					className="flex items-center bg-gray-400 text-xs text-white rounded-sm py-2 px-4 ml-7"
					onClick={handleUpload}
				>
					Загрузить
				</button>
				<h2 className="text-gray-100 text-xl ">
					Выбрано файлов: {files.length}
				</h2>
			</div>
		</div>
	)
}

export default App
