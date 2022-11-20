
-- 내가 수강중인 강좌 조회
SELECT * FROM division AS a INNER JOIN user_division_link AS b ON a.idx = b.division_idx WHERE b.user_idx = ${userIdx};

-- 내가 속한 그룹 목록 조회
SELECT * FROM course AS a INNER JOIN course_user_link AS b ON a.idx = b.course_idx WHERE b.user_idx = ${userIdx};


-- 강좌에 속한 사람 목록 조회
SELECT * FROM USER AS a INNER JOIN course_user_link as b ON a.idx = b.user_idx WHERE b.course_idx = ${idx};

-- classes_file_link 인덱스 검색
SELECT b.classes_idx, b.file_idx FROM file AS a INNER JOIN classes_file_link AS b ON a.idx = b.file_idx WHERE a.idx = ${idx}
-- subjects_file_link 인덱스 검색
SELECT b.subjects_idx, b.file_idx FROM file AS a INNER JOIN subjects_file_link AS b ON a.idx = b.file_idx WHERE a.idx = ${idx}
-- submit_file_link 인덱스 검색
SELECT b.submit_idx, b.file_idx FROM file AS a INNER JOIN submit_file_link AS b ON a.idx = b.file_idx WHERE a.idx = ${idx}


-- 해당 수업의 파일 검색
SELECT a.file_idx AS idx, uuid, fid, name, size FROM classes_file_link AS a INNER JOIN file AS b ON a.file_idx = b.idx WHERE classes_idx = ${classesIdx}

-- 해당 과제의 파일 검색
SELECT a.file_idx AS idx, uuid, fid, name, size FROM subjects_file_link AS a INNER JOIN file AS b ON a.file_idx = b.idx WHERE subjects_idx = ${subjectsIdx}

-- 해당 제출된 과제의 파일 검색
SELECT a.file_idx AS idx, uuid, fid, name, size FROM submit_file_link AS a INNER JOIN file AS b ON a.file_idx = b.idx WHERE submit_idx = ${submitIdx}
