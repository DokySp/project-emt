
-- 내가 수강중인 강좌 조회
SELECT * FROM course AS a INNER JOIN course_user_link AS b ON a.idx = b.course_idx;