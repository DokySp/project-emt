import { Button, Col, FormControl, FormControlProps, ListGroup, Row } from "react-bootstrap"
import { MouseEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { deleteFile, fetchImageFile, fetchSubjectFile } from "../../../../services/file.service";
import { API_URL } from "../../../../constants/url";
import { getSubject } from "../../../../services/subject.service";
import { SubjectInterface } from "../../../../schemas/interfaces";
import CourseItem from "../../Course/course.list.item";
import FileItem, { FileItemInterface } from "../../../common/FileItem/file.item";
import { ReactElement } from "react-markdown/lib/react-markdown";


const File = () => {

  const [subjectIdx, setSubjectIdx] = useState(0)
  const [subject, setSubject] = useState<SubjectInterface>()
  const [subjectFileList, setSubjectFileList] = useState<Array<ReactElement>>()
  const [isFileChanged, setIsFileChanged] = useState<boolean>(false)

  const [imageUrl, setImageUrl] = useState("")

  // const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.files)
  //   if (event.target.files === undefined) {
  //     setFileName("선택된 파일 없음")
  //   } else {
  //     setFileName(event.target.files[0].name)
  //   }
  // }

  interface InputValue {
    imgfiles: FileList,
    files: FileList,
  }

  // react-hook-form
  const {
    register,
    handleSubmit,
  } = useForm<InputValue>();


  // submit 호출 시
  const onImageSubmitHadler = async (data: InputValue) => {
    const formData = new FormData();
    const file = data.imgfiles[0]

    // 파일 형식 검사
    if (file.type.substring(0, 6) !== "image/") {
      alert(`이미지 파일만 업로드 가능합니다.`);
      return;
    }

    // 파일 크기 검사
    // if (
    //   data[`fileList${i}`].length &&
    //   data[`fileList${i}`][0].size > 1024 * 1024 * 100 // TODO: 파일 최대 크기 검사
    // ) {
    //   alert(
    //     `100MB 이하 파일만 업로드 가능합니다.`
    //   );
    //   return;
    // }

    // 폼 데이터 생성
    // 파일은 (key, file, name) 형식
    formData.append('file', file, file.name);
    const res = await fetchImageFile({ formData })

    console.log(res)
    setImageUrl(`${API_URL}/api/file/${res.uuid}`)
  };

  // submit 호출 시
  const onSubjectSubmitHadler = async (data: InputValue) => {
    const formData = new FormData();

    // 파일 형식 검사
    // if (data.file.length && data.file.type !== "application/pdf") {
    //   alert(`PDF 파일만 업로드 가능합니다.`);
    //   return;
    // }

    // 파일 크기 검사
    // if (
    //   data[`fileList${i}`].length &&
    //   data[`fileList${i}`][0].size > 1024 * 1024 * 100 // TODO: 파일 최대 크기 검사
    // ) {
    //   alert(
    //     `100MB 이하 파일만 업로드 가능합니다.`
    //   );
    //   return;
    // }

    // 폼 데이터 생성
    // 파일은 (key, file, name) 형식
    formData.append('file', data.files[0], data.files[0].name);
    await fetchSubjectFile({ idx: subjectIdx, formData: formData })
    setIsFileChanged(isFileChanged === true ? false : true)
  };


  useEffect(() => {

    if (subject) {

      const list: Array<ReactElement> = [];

      subject.files!.map((item) => {
        console.log(item)
        list.push(
          (<FileItem
            file={item}
            onDeleteClick={() => {
              deleteFile({ idx: item.idx }).then(() => {
                setIsFileChanged(isFileChanged === true ? false : true)
              })
            }} />)
        )
      })
      setSubjectFileList(list)
    }

  }, [subject])

  useEffect(() => {
    getSubject({ idx: subjectIdx }).then(result => {
      setSubject(result)
      console.log(result)
    })
  }, [isFileChanged])



  return (
    <>
      <h3 className="mb-3 mt-5">/api/file</h3>

      <Row className="mb-1">
        <Col>
          <Row>
            <Col>
              <label form="exampleInputEmail1" className="form-label">Public 파일 첨부</label>
            </Col>
          </Row>
          <form
            className="col-12 col-sm-10 col-xl-6"
            onSubmit={handleSubmit(onImageSubmitHadler)}>
            <Row>
              <Col sm>
                <FormControl type="file" required={false} {...register("imgfiles")} />
              </Col>
              <Col sm={2} >
                <Button type="submit" variant="primary" style={{ width: "100%" }}>
                  업로드
                </Button>
              </Col>
            </Row>
          </form>

          <img className="mt-3 mb-1" width={300} src={imageUrl} />

        </Col>
      </Row>



      <Row className="mb-2">
        <Col sm={2}>
          <div>target subjectIdx</div>
          <FormControl value={subjectIdx} onChange={(event) => {
            setSubjectIdx(Number(event.target.value))
          }} />
        </Col>
        <Col>
          <div>&nbsp;</div>
          <Button className="me-1" onClick={async () => {
            const result = await getSubject({ idx: subjectIdx })
            setSubject(result)
            console.log(result)
          }} >SUBJECT GET ({subjectIdx})</Button>
        </Col>
        <Col>
          <div># of File</div>
          {subject ? subject?.files?.length : "undefined"}
        </Col>
      </Row>
      <Row>

      </Row>


      <Row className="mb-1">
        <Col>

          <Row>
            <Col>
              <label form="exampleInputEmail1" className="form-label">파일 첨부</label>
            </Col>
          </Row>

          <form
            className="col-12 col-sm-10 col-xl-6"
            onSubmit={handleSubmit(onSubjectSubmitHadler)}>
            <Row>

              <Col sm>
                <FormControl type="file" required={false} {...register("files")} />
              </Col>
              <Col sm={2} >
                <Button type="submit" variant="primary" style={{ width: "100%" }}>
                  업로드
                </Button>
              </Col>

            </Row>
          </form>



          {/* 파일 리스트 */}
          <Row className="mt-3 mb-3">
            <ListGroup>
              {
                subjectFileList && subjectFileList.map((item) => item)
              }
            </ListGroup>

          </Row>

        </Col>
      </Row>

    </>
  )
}

export default File