using UnityEngine.SceneManagement;
using UnityEngine;

public class StartMenuUI : MonoBehaviour
{
    public void StartGame()
    {
        SceneManager.LoadScene("Level 1");
        FindObjectOfType<AudioManager>().Play("menuClick");
    }
    public void Quit()
    {
        Application.Quit();
        Debug.Log("Quitting Game...");
        FindObjectOfType<AudioManager>().Play("menuClick");
    }
}
