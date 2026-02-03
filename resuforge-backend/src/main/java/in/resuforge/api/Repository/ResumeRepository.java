package in.resuforge.api.Repository;

import in.resuforge.api.Document.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends MongoRepository<Resume,String> {
    List<Resume>findByUserIdOrderByUpdatedDateDesc(String userId);
    Optional<Resume> findByUserIdAndId(String userId, String resumeId);
}
