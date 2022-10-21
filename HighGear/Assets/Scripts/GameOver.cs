using UnityEngine.SceneManagement;
using UnityEngine;

public class GameOver : MonoBehaviour
{
   public void mainMenu()
    {
        SceneManager.LoadScene(0);
        FindObjectOfType<AudioManager>().Play("menuClick");
    }
}
