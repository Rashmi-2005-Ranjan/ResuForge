package in.resuforge.api.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.resuforge.api.DTO.AuthResponse;
import in.resuforge.api.Document.Resume;
import in.resuforge.api.Repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {
    private final Cloudinary cloudinary;
    private final ResumeRepository resumeRepository;
    private final AuthService authService;

    public Map<?, ?> uploadSingleImage(MultipartFile file) throws IOException {
        log.info ( "Uploading file {} to Cloudinary" , file.getOriginalFilename ( ) );
        Map<?, ?> imageUploadResult = cloudinary.uploader ( ).upload ( file.getBytes ( ) , ObjectUtils.asMap ( "resource_type" , "image" ) );
        log.info ( "Image upload result {}" , imageUploadResult );
        return Map.of ( "imageUrl" , imageUploadResult.get ( "secure_url" ).toString ( ) );
    }

    public Map<String, String> uploadResumeImages(String resumeId ,
                                                  Object principal ,
                                                  MultipartFile thumbnail ,
                                                  MultipartFile profileImage) throws IOException {
        //Step 1: Get The Current Logged In User
        AuthResponse authResponse = authService.getProfile ( principal );
        //Step 2: Get The Existing Resume By ID and User
        Resume existingResume = resumeRepository.findByUserIdAndId ( authResponse.getId ( ) , resumeId )
                .orElseThrow ( () -> new RuntimeException ( "Resume not found" ) );
        //Step 3: Upload Thumbnail Image if provided and update resume
        Map<String, String> returnValue = new HashMap<> ( );

        Map<?, ?> uploadResult;
        if (Objects.nonNull ( thumbnail )) {
            uploadResult = uploadSingleImage ( thumbnail );

            existingResume.setThumbnailLink ( uploadResult.get ( "imageUrl" ).toString ( ) );

            returnValue.put ( "thumbnailLink" , uploadResult.get ( "imageUrl" ).toString ( ) );
        }

        if (Objects.nonNull ( profileImage )) {
            uploadResult = uploadSingleImage ( profileImage );

            if (Objects.isNull ( existingResume.getProfileInfo ( ) )) {
                existingResume.setProfileInfo ( new Resume.ProfileInfo ( ) );
            }

            existingResume.getProfileInfo ( ).setProfilePreviewUrl ( uploadResult.get ( "imageUrl" ).toString ( ) );

            returnValue.put ( "profilePreviewUrl" , uploadResult.get ( "imageUrl" ).toString ( ) );
        }
        //Step 4: Save the details to the database
        resumeRepository.save ( existingResume );
        returnValue.put ( "message" , "Images Uploaded Successfully" );
        //Step 5: Return the result
        return returnValue;
    }
}
