package in.resuforge.api.Service;

import in.resuforge.api.DTO.AuthResponse;
import in.resuforge.api.DTO.CreateResumeRequest;
import in.resuforge.api.Document.Resume;
import in.resuforge.api.Repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {
    private final ResumeRepository resumeRepository;
    private final AuthService authService;

    public Resume createResume(CreateResumeRequest request , Object principalObject) {
        //Step 1: Create a new Resume object
        Resume newResume = new Resume ( );
        //Step 2: Get the current logged in user
        AuthResponse response = authService.getProfile ( principalObject );
        //Step 3: Update the Resume object with data from request and user
        newResume.setUserId ( response.getId ( ) );
        newResume.setTitle ( request.getTitle ( ) );
        //Step 4: Set default values for other fields
        setDefaultResumeData ( newResume );
        //Step 5: Save the Resume object to the database
        return resumeRepository.save ( newResume );
    }

    private void setDefaultResumeData(Resume newResume) {
        newResume.setProfileInfo ( new Resume.ProfileInfo ( ) );
        newResume.setContactInfo ( new Resume.ContactInfo ( ) );
        newResume.setWorkExperiences ( new ArrayList<> ( ) );
        newResume.setEducations ( new ArrayList<> ( ) );
        newResume.setSkills ( new ArrayList<> ( ) );
        newResume.setProjects ( new ArrayList<> ( ) );
        newResume.setCertifications ( new ArrayList<> ( ) );
        newResume.setLanguages ( new ArrayList<> ( ) );
        newResume.setInterests ( new ArrayList<> ( ) );
    }

    public List<Resume> getUserResumes(Object principal) {
        //Step 1: Get The Current Profile
        AuthResponse profile = authService.getProfile ( principal );
        //Step 2: Fetch Resumes from Repository and return
        return resumeRepository.findByUserIdOrderByUpdatedDateDesc ( profile.getId ( ) );
    }

    public Resume getResumesById(String resumeId , Object principal) {
        //Step 1: Get the current logged in user
        AuthResponse profile = authService.getProfile ( principal );
        //Step 2: Fetch the resume by ID
        return resumeRepository.findByUserIdAndId ( profile.getId ( ) , resumeId )
                .orElseThrow ( () -> new RuntimeException ( "Resume not found" ) );
    }

    public Resume updateResume(String resumeId , Resume updatedData , Object principal) {
        //Step 1: Get The Current logged User
        AuthResponse profile = authService.getProfile ( principal );
        //Step 2: Fetch the existing resume
        Resume existingResume = resumeRepository.findByUserIdAndId ( profile.getId ( ) , resumeId )
                .orElseThrow ( () -> new RuntimeException ( "Resume not found" ) );
        //Step 3: Update the existing resume with new data
        existingResume.setTitle ( updatedData.getTitle ( ) );
        existingResume.setThumbnailLink ( updatedData.getThumbnailLink ( ) );
        existingResume.setTemplate ( updatedData.getTemplate ( ) );
        existingResume.setProfileInfo ( updatedData.getProfileInfo ( ) );
        existingResume.setContactInfo ( updatedData.getContactInfo ( ) );
        existingResume.setWorkExperiences ( updatedData.getWorkExperiences ( ) );
        existingResume.setEducations ( updatedData.getEducations ( ) );
        existingResume.setSkills ( updatedData.getSkills ( ) );
        existingResume.setProjects ( updatedData.getProjects ( ) );
        existingResume.setCertifications ( updatedData.getCertifications ( ) );
        existingResume.setLanguages ( updatedData.getLanguages ( ) );
        existingResume.setInterests ( updatedData.getInterests ( ) );
        //Step 4: Save the updated resume
        return resumeRepository.save ( existingResume );
    }

    public void deleteResume(String resumeId , Object principal) {
        //Step 1: Get the current logged in user
        AuthResponse profile = authService.getProfile ( principal );
        //Step 2: Fetch the existing resume
        Resume resume = resumeRepository.findByUserIdAndId ( profile.getId ( ) , resumeId )
                .orElseThrow ( () -> new RuntimeException ( "Resume not found" ) );
        //Step 3: Delete the resume
        resumeRepository.delete ( resume );
    }
}