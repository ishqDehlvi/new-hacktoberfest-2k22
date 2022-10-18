using UnityEngine.SceneManagement;
using UnityEngine;

public class PauseMenuUI : MonoBehaviour
{
    public GameObject pauseMenuUI;
    public GameObject resumeMenuUI;   

    public void ResumeButton()
    {
        pauseMenuUI.SetActive(false);
        resumeMenuUI.SetActive(true);
        Time.timeScale = 1;
        FindObjectOfType<AudioManager>().Play("menuClick");
    }

    public void MainMenu()
    {
        SceneManager.LoadScene(0);
        Time.timeScale = 1;
        FindObjectOfType<AudioManager>().Play("menuClick");
    }

    

    public void PauseMenu()
    {
        pauseMenuUI.SetActive(true);
        resumeMenuUI.SetActive(false);
        Time.timeScale = 0f;
        FindObjectOfType<AudioManager>().Play("menuClick");
    }

    
}
